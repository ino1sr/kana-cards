SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)

default: all


.PHONY: all

all: build

.PHONY: clean

clean:
	rm -fr _build

.PHONY: server

server: node_modules
	webpack-dev-server --stdin

.PHONY: build

build: node_modules elm-stuff
	NODE_ENV=production webpack -p

node_modules: yarn.lock package.json
	yarn

elm-stuff: elm-package.json
	elm-package install -y

yarn.lock:
	yarn
