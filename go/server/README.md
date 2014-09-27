# Go Web App Server

An http server written in Go which functions as a wiki. This app is fully
RESTful, so you can read, create, update, and delete wiki entries at will.

Data is persistant through a configurable MongoDB collection.

## Install
First, start a mongo server. Then create a DB, and then add a user with a password and
privileges to the DB.

Then do:
```shell
make install
# Update config/config.gcfg to reflect your DB settings (See below)
./app
```

Other helpful `make` commands include:
```shell
make clean    # cleans executable files from the dir
make build    # cleans and builds new executable
```

### Running Locally for Development
To run the app locally:
```shell
go run ./app.go # or just ./app, if the executable is built
```

### Running as a Daemon
A Makefile has been set up with basic tasks related to running the app as a
daemon. To set the daemon up:
```shell
make start
```

To see all running background processes related to the daemon:
```shell
make list
```

To kill all daemon-related processes:
```shell
make stop
```

### Initializing App at Boot
To automatically start the app at boot, edit your crontab file (`crontab -e`)
and add:
```shell
@reboot cd project-dir && make start # change project-dir to a real dir
```


## Config

Go has a package which allows you to read config files in a similar format to
INI files. In the main config file, you must define 5 settings:

* Server
* Username
* Password
* Database
* Collection (MongoDB's name for a 'Table', if you're used to SQL)

By default, authentication is required via a username and password to connect to
the database.

## See it in action
To give it a test drive, see my dev wiki which uses the code in this repo:

http://wiki.thesocietea.org
