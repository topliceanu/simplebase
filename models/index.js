var mongoose = require('mongoose');
var mongooseTypes = require('mongoose-types');

var conf = require('./../conf.js');

var connection = mongoose.connect(conf.mongo.url);

// public api
exports.connection = connection;
