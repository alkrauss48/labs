package main

import (
  "fmt"
  "net/http"
  "gopkg.in/mgo.v2"
  "gopkg.in/mgo.v2/bson"
  "code.google.com/p/gcfg"
  "./modules/globals"
)

type Config struct {
  Adapter struct {
    Server string
    Username string
    Password string
    Database string
    Collection string
  }
}

type Page struct {
  Title string
  Body  string
}

func (p *Page) save() error {
  _, err := globals.Collection.Upsert(bson.M{"title": p.Title}, p)
  return err
}

func loadPage(title string) (*Page, error) {
  result := Page{}
  err := globals.Collection.Find(bson.M{"title": title}).One(&result)
  if err != nil {
    return nil, err
  }
  return &result, nil
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
  err := globals.Templates.ExecuteTemplate(w, tmpl+".html", p)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
  p, err := loadPage(title)
  if err != nil {
    http.Redirect(w, r, "/edit/"+title, http.StatusFound)
    return
  }
  renderTemplate(w, "view", p)
}

func editHandler(w http.ResponseWriter, r *http.Request, title string) {
  p, err := loadPage(title)
  if err != nil {
    p = &Page{Title: title}
  }
  renderTemplate(w, "edit", p)
}

func saveHandler(w http.ResponseWriter, r *http.Request, title string) {
  body := r.FormValue("body")
  p := &Page{Title: title, Body: body}
  err := p.save()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
  http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
  var result []Page
  globals.Collection.Find(nil).All(&result)
  err := globals.Templates.ExecuteTemplate(w, "index.html", result)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    m := globals.ValidPath.FindStringSubmatch(r.URL.Path)
    if m == nil {
      http.NotFound(w, r)
      return
    }
   fn(w, r, m[2])
  }
}

func establishConnections(cfg Config){
  session, _ := mgo.Dial(
    "mongodb://" +
    cfg.Adapter.Username + ":" +
    cfg.Adapter.Password + "@" +
    cfg.Adapter.Server + "/" +
    cfg.Adapter.Database)
  globals.Collection = session.DB("").C(cfg.Adapter.Collection)
}

func main() {
  var cfg Config
  err := gcfg.ReadFileInto(&cfg, "config/config.gcfg")
  if err != nil {
    fmt.Println(err)
    return
  }
  establishConnections(cfg)

  // Run all the handlers in their own thread
  go http.HandleFunc("/view/", makeHandler(viewHandler))
  go http.HandleFunc("/edit/", makeHandler(editHandler))
  go http.HandleFunc("/save/", makeHandler(saveHandler))
  go http.HandleFunc("/", indexHandler)
  http.ListenAndServe(":8080", nil)
}
