code_via_SMS
============

#Overview

AngularJS frontend plugged-in to express with jade and less middleware spitting out html/css.

Looks elaborate and time-consuming, but it's based on my usual stack so didn't take toooooo long to set up.

##Stuff under da hood:

* Jasmine/karma for testing Angular app, and jasmine-node/supertest for the node parts
* Grunt compiles the jade to angular partials (writing HTML longhand is boring)

Didn't get time to (TO FO):
* plugin a watching task
* pump out a dist version

##Set up

Install jasmine-node test suite and grunt task runner

`npm install jasmine-node grunt -g`

And modules

`npm install`

Run grunt to download bower packages and set up client and run server (and run tests!)

`grunt`

Brower should automatically open to: [http://localhost:3000](http://localhost:3000)
