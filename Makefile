
install:
	npm ci
	npm link

start: 
	node bin/page-loader.js  https://ru.hexlet.io/courses

help:
	node bin/page-loader.js -h

v:
	node bin/page-loader.js -V

lint:
	npx eslint .



