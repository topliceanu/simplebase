var models = require('./../../models');

exports.index = function(req, res){
  res.render('index', {
		layout: false
	});
};


// middleware
exports.isAdmin = function (req, res, next) {
	if (req.session.isAdmin) return next();
	return res.redirect('/admin/login');
};


exports.login = function (req, res) {
	res.render('login', {
		layout: false
	});
};


exports.ajaxlogin = function (req, res) {
	return models.Admin.getAdmin( function (err, admin) {
		if (err) return res.send(500);
		if (!admin) return res.send(404);
		if (req.body && 
				req.body.username &&
				req.body.password &&
				req.body.username === admin.username &&
				req.body.password === admin.password) {
			req.session.isAdmin = true;
			return res.send(200);
		}
		return res.send(403);
	});
};


// available collections
exports.collection = {};
exports.collection.create = function (req, res) {};
exports.collection.read = function (req, res) {};
exports.collection.readAll = function (req, res) {};
exports.collection.update = function (req, res) {};
exports.collection.destory = function (req, res) {};
