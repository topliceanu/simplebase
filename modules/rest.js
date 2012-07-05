var mongoose = require('mongoose');
var mers = require('mers');


var rest = function (app, options) {
	app.use('/api/v1', mers({
		'mongoose': mongoose
	}).rest());
};


// public api
module.exports = rest;
