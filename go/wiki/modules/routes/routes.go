package routes

import (
	"../globals"
	"../helpers"
	"../page"
	"net/http"
)

func ViewHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := page.LoadPage(title)
	if err != nil {
		http.Redirect(w, r, "/edit/"+title, http.StatusFound)
		return
	}
	helpers.RenderTemplate(w, "view", p)
}

func EditHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := page.LoadPage(title)
	if err != nil {
		p = &page.Page{Title: title}
	}
	helpers.RenderTemplate(w, "edit", p)
}

func SaveHandler(w http.ResponseWriter, r *http.Request, title string) {
	body := r.FormValue("body")
	p := &page.Page{Title: title, Body: body}
	err := p.Save()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

func DeleteHandler(w http.ResponseWriter, r *http.Request, title string) {
	p, err := page.LoadPage(title)
	if err != nil {
		http.Redirect(w, r, "/view/"+title, http.StatusFound)
		return
	}
	err = p.Delete()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	http.Redirect(w, r, "/", http.StatusFound)
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	var result []page.Page
	globals.Collection.Find(nil).All(&result)
	err := globals.Templates.ExecuteTemplate(w, "index.html", result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
