var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.configure(function(){
	app.set('basepath', '/admin');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
});


// routes
app.get('/', [routes.isAdmin], routes.index);
app.get('/login', routes.login);
app.post('/login', routes.ajaxlogin);

app.get('/collections', [routes.isAdmin], routes.collection.readAll);
app.get('/collections/:id', [routes.isAdmin], routes.collection.read);
app.post('/collections', [routes.isAdmin], routes.collection.create);
app.put('/collections/:id', [routes.isAdmin], routes.collection.update);
app.del('/collections/:id', [routes.isAdmin], routes.collection.destroy);

app.post('/user', [routes.isAdmin], routes.user);


// publis api
module.exports = app;
