package globals

import(
  "html/template"
  "regexp"
  "gopkg.in/mgo.v2"
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

var Cfg Config

var Templates = template.Must(template.ParseFiles(
  "templates/edit.html",
  "templates/view.html",
  "templates/index.html",
  "templates/partials/_header.html",
  "templates/partials/_footer.html"))

var ValidPath = regexp.MustCompile("^/(edit|save|view|delete)/(.+)$")

var Collection *mgo.Collection
