var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models = require('./../models');



passport.use( new LocalStrategy( function validate (username, password, done) {
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


passport.serializeUser( function serialize (user, done) {
	return done(null, user.id);
});


passport.deserializeUser( function deserialize (id, done) {
	return User.findById(id, done);
});


// public api
exports.initialize = passport.initialize;
exports.session = passport.session;
