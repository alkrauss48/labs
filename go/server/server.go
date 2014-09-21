package main

import (
  "fmt"
  "html/template"
  "net/http"
  "regexp"
  "errors"
  "gopkg.in/mgo.v2"
  "gopkg.in/mgo.v2/bson"
  "code.google.com/p/gcfg"
)

var templates = template.Must(template.ParseFiles(
  "templates/edit.html", "templates/view.html", "templates/index.html"))

var validPath = regexp.MustCompile("^/(edit|save|view)/([a-zA-Z0-9]+)$")

var cfg Config
var collection *mgo.Collection

type Config struct {
  Adapter struct {
    Server string
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

func getTitle(w http.ResponseWriter, r *http.Request) (string, error) {
  m := validPath.FindStringSubmatch(r.URL.Path)
  if m == nil {
      http.NotFound(w, r)
      return "", errors.New("Invalid Page Title")
  }
  return m[2], nil // The title is the second subexpression.
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

func main() {
  err := gcfg.ReadFileInto(&cfg, "config/config.gcfg")
  if err != nil {
    fmt.Println(err)
    return
  }
  session, _ := mgo.Dial(cfg.Adapter.Server)
  collection = session.DB(cfg.Adapter.Database).C(cfg.Adapter.Collection)

  http.HandleFunc("/view/", makeHandler(viewHandler))
  http.HandleFunc("/edit/", makeHandler(editHandler))
  http.HandleFunc("/save/", makeHandler(saveHandler))
  http.HandleFunc("/", indexHandler)
  http.ListenAndServe(":8080", nil)
}
