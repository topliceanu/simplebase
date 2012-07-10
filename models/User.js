var mongoose = require('mongoose');


var ROLES = ['user', 'admin'];


var User;
var UserSchema = new mongoose.Schema({
	'username': {'type': String, 'required': true, 'index': true},
	'password': {'type': String, 'required': true, 'index': true},
	'role': {'type': String, 'enum': ROLES, 'required': true, default: 'user'}
});

UserSchema.statics.ROLES = ROLES;


User = mongoose.model('User', UserSchema);
module.exports = User;
