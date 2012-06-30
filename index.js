var connect = require('connect');

var conf = require('./conf.js');
var api = require('./modules/api.js');

var app = connect()
	.use(connect.static('public'))
	.use(connect.logger('default'))
	.use(connect.compress())
	.use(connect.staticCache())
	.use(connect.favicon())
	.use(connect.bodyParser())
	.use(api);
	
app.listen(conf.http.port);
