package main

import (
  "fmt"
  "html/template"
  "net/http"
  "regexp"
  "gopkg.in/mgo.v2"
  "gopkg.in/mgo.v2/bson"
  "code.google.com/p/gcfg"
)

var templates = template.Must(template.ParseFiles(
  "templates/edit.html", "templates/view.html", "templates/index.html"))

var validPath = regexp.MustCompile("^/(edit|save|view)/([a-zA-Z0-9]+)$")

var collection *mgo.Collection

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
  _, err := collection.Upsert(bson.M{"title": p.Title}, p)
  return err
}

func loadPage(title string) (*Page, error) {
  result := Page{}
  err := collection.Find(bson.M{"title": title}).One(&result)
  if err != nil {
    return nil, err
  }
  return &result, nil
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
  err := templates.ExecuteTemplate(w, tmpl+".html", p)
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
  collection.Find(nil).All(&result)
  err := templates.ExecuteTemplate(w, "index.html", result)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    m := validPath.FindStringSubmatch(r.URL.Path)
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
  collection = session.DB("").C(cfg.Adapter.Collection)
}

func main() {
  var cfg Config
  err := gcfg.ReadFileInto(&cfg, "config/config.gcfg")
  if err != nil {
    fmt.Println(err)
    return
  }
  establishConnections(cfg)

  http.HandleFunc("/view/", makeHandler(viewHandler))
  http.HandleFunc("/edit/", makeHandler(editHandler))
  http.HandleFunc("/save/", makeHandler(saveHandler))
  http.HandleFunc("/", indexHandler)
  http.ListenAndServe(":8080", nil)
}
