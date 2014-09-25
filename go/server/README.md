# Go Web App Server

A basic http server written in Go which functions as a wiki. You can read,
create, update, and delete wiki entries at will.

Data is persistant through a configurable MongoDB collection.

## Install
First, start a mongo server. Then create a DB, and then add a user with a password and
privileges to the DB.

Then do:
```shell
cp config/config.gcfg.example config/config.gcfg # And add your credentials
go build server.go
./server
```

## Config

Go has a package which allows you to read config files in a similar format to
INI files. In this config, you must define 5 settings:

* Server
* Username
* Password
* Database
* Collection (MongoDB's name for a 'Table', if you're used to SQL)

By default, we require authentication via a username and password to connect to
the database.

## See it in action
To give it a test drive, give my dev wiki a shot which uses the code here:

http://wiki.thesocietea.org
