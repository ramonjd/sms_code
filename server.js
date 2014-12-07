var express = require('express'),
    app,
    server;

// :::::::::::::::::::: app
app = require('./app/app.js')(express, process.env.PORT || 3000);

server = app.listen(app.get('port'));

console.log('Server running at localhost:' + app.get('port'));

