var express = require('express');

var routes = require('./routes');
var conf = require('./conf.js');


var app = module.exports = express.createServer();

// General Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});


// Developement Configuration
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


// Production Configuration
app.configure('production', function(){
  app.use(express.errorHandler());
});


// start http server
app.listen(conf.http.port, conf.http.host, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
