var passport = require('passport');
var models = require('./../models');


var LocalStrategy = passport.Strategy;

passport.use( new LocalStrategy( function (username, password, done) {
	models.User.findOne()
		.where('username').equals(username)
		.exec( function (err, user) {
			if (err) return done(err);

			if (!user) return done(null, false, {
				'message': 'User not found'
			});

			if (user.password !== password) return done(null, false, {
				'message': 'Invalid password'
			});

			return done(null, user);
		});
}));


// public api
exports.initialize = passport.initialize;
exports.session = passport.session;
