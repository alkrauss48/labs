list:
	@ echo "$$(tput setaf 6)Wiki Daemon script processes:$$(tput sgr 0)"
	-@ pgrep -fl "./bin/wiki_daemon"
	@ echo "$$(tput setaf 6)Go Wiki app processes:$$(tput sgr 0)"
	-@ pgrep -fl "^./app\$$"
start:
	nohup ./bin/wiki_daemon &
	@ echo "$$(tput setaf 6)Started Go Wiki daemon$$(tput sgr 0)"
stop:
	- pkill -f "./bin/wiki_daemon"
	- pkill -f "^./app\$$"
	@ echo "$$(tput setaf 6)Killed Go Wiki daemon$$(tput sgr 0)"
clean:
	go clean
build:
	make clean && go build app.go
install:
	cp config/config.gcfg.example config/config.gcfg
	go get gopkg.in/mgo.v2 code.google.com/p/gcfg
