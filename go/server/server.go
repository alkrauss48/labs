package main

import (
  "fmt"
  "net/http"
  "code.google.com/p/gcfg"
  "./modules/globals"
  "./modules/helpers"
  "./modules/page"
)

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
  p, err := page.LoadPage(title)
  if err != nil {
    http.Redirect(w, r, "/edit/"+title, http.StatusFound)
    return
  }
  helpers.RenderTemplate(w, "view", p)
}

func editHandler(w http.ResponseWriter, r *http.Request, title string) {
  p, err := page.LoadPage(title)
  if err != nil {
    p = &page.Page{Title: title}
  }
  helpers.RenderTemplate(w, "edit", p)
}

func saveHandler(w http.ResponseWriter, r *http.Request, title string) {
  body := r.FormValue("body")
  p := &page.Page{Title: title, Body: body}
  err := p.Save()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
  http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
  var result []page.Page
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

func main() {
  err := gcfg.ReadFileInto(&globals.Cfg, "config/config.gcfg")
  if err != nil {
    fmt.Println(err)
    return
  }

  helpers.EstablishConnections()

  // Run all the handlers in their own thread
  go http.HandleFunc("/view/", makeHandler(viewHandler))
  go http.HandleFunc("/edit/", makeHandler(editHandler))
  go http.HandleFunc("/save/", makeHandler(saveHandler))
  go http.HandleFunc("/", indexHandler)
  http.ListenAndServe(":8080", nil)
}
