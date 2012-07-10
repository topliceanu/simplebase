var mongoose = require('mongoose');

var Mortimer = require('./../lib/mortimer/');
var models = require('./../models');
var util = require('./../util.js');


var mortimer = new Mortimer({
	base: '/api',
	version: 'v1'
});

var rest = function (app, options) {
	models.getDynamicModels(function (err, models) {
		if (err) return util.log('error', 'unable to fetch dynamic models', err);
		models.forEach( function (Model) {
			mortimer.router(Model).bind(app);
		});
	});
};


// public api
module.exports = rest;
