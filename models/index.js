var mongoose = require('mongoose');

var conf = require('./../conf.js');


// init
var connection = mongoose.connect(conf.mongo.url);


// public api
exports.User = require('./User.js');;
exports.connection = connection;
