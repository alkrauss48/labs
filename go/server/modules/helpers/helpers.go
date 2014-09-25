package helpers

import(
  "../globals"
  "../page"
  "net/http"
  "gopkg.in/mgo.v2"
)

func EstablishConnections(){
  session, _ := mgo.Dial(
    "mongodb://" +
    globals.Cfg.Adapter.Username + ":" +
    globals.Cfg.Adapter.Password + "@" +
    globals.Cfg.Adapter.Server + "/" +
    globals.Cfg.Adapter.Database)
  globals.Collection = session.DB("").C(globals.Cfg.Adapter.Collection)
}

func RenderTemplate(w http.ResponseWriter, tmpl string, p *page.Page) {
  err := globals.Templates.ExecuteTemplate(w, tmpl+".html", p)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

