var express = require('express');
var connect = require('connect');
var MongoStore = require('connect-mongodb');

var routes = require('./routes');
var conf = require('./conf.js');
var util = require('./util.js');
var models = require('./models');
var rest = require('./modules/rest.js');


var app = module.exports = express.createServer();


// General Configuration
app.configure( function () {
	app.use(connect.favicon(conf.favicon, {
		'maxAge': conf.static.maxAge
	}));
  app.use(express.bodyParser());
	app.use(connect.query());
	app.use(express.logger('dev'));
  app.use(express.methodOverride());
	app.use(connect.cookieParser(conf.cookie.secret));
	app.use(express.session({
		'secret': conf.cookie.secret,
		'key': conf.cookie.key, 
		'cookie': { 
			'maxAge': conf.cookie.maxAge,
		},
		'store': new MongoStore({
			'url': conf.mongo.url
		})
	}));
});


// Developement Configuration
app.configure(conf.DEVELOPMENT, function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(conf.static.publicDir));
});


// Production Configuration
app.configure(conf.PRODUCTION, function () {
  app.use(express.errorHandler());
	app.use(express.logger({
		'format': ':response-time ms - :date - :req[x-real-ip] - :method :url :user-agent / :referrer'
	}));
	app.use(connect.compress());	
  app.use(express.static(conf.static.publicDir, {
		'maxAge': conf.static.maxAge
	}));
	app.use(connect.staticCache());
});


// add routes
routes(app);
rest(app);


// start http server
app.listen(conf.http.port, conf.http.host, function () {
  util.log('info', 'Express server started', {
		'address': app.address(), 
		'settings': app.settings
	});
});
