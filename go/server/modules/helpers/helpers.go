package helpers

import(
  "../globals"
  "../page"
  "net/http"
  "gopkg.in/mgo.v2"
)

func EstablishConnection(){
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

func MakeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    m := globals.ValidPath.FindStringSubmatch(r.URL.Path)
    if m == nil {
      http.NotFound(w, r)
      return
    }
   fn(w, r, m[2])
  }
}
