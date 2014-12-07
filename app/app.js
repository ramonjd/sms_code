
var bodyParser = require('body-parser'),
  path = require('path'),
  lessMiddleware = require('less-middleware'),
  app;

module.exports = function (server, port) {
  
  app = server();

  // :::::::::::::::::::: client app
  app.set('view engine', 'jade');
  app.use(lessMiddleware(path.join(__dirname, '../public')));
  app.set('views', __dirname + '/views');

  // :::::::::::::::::::: post response as json
  app.use(bodyParser.urlencoded({
  extended: true
  }));
  app.use(bodyParser.json());

  app.use(server.static(path.join(__dirname, '../public')));

  // :::::::::::::::::::: routes
  require('./routes/routes.js')(app);
  
  app.set('port', port);
  
  return app;

};


