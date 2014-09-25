package page

import(
  "../globals"
  "gopkg.in/mgo.v2/bson"
)
type Page struct {
  Title string
  Body  string
}

func (p *Page) Save() error {
  _, err := globals.Collection.Upsert(bson.M{"title": p.Title}, p)
  return err
}

func LoadPage(title string) (*Page, error) {
  result := Page{}
  err := globals.Collection.Find(bson.M{"title": title}).One(&result)
  if err != nil {
    return nil, err
  }
  return &result, nil
}
