package main

import (
  "net/http"
  "./modules/helpers"
  "./modules/routes"
)

func main() {
  helpers.ReadConfig()
  helpers.EstablishConnection()

  // Run all the handlers in their own thread with goroutines
  go http.HandleFunc("/view/", helpers.MakeHandler(routes.ViewHandler))
  go http.HandleFunc("/edit/", helpers.MakeHandler(routes.EditHandler))
  go http.HandleFunc("/save/", helpers.MakeHandler(routes.SaveHandler))
  go http.HandleFunc("/delete/", helpers.MakeHandler(routes.DeleteHandler))
  go http.HandleFunc("/", routes.IndexHandler)
  http.ListenAndServe(":8080", nil)
}
