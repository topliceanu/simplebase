var winston = require('winston');

// configure winston logger
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	timestamp: true,
	colorize: true
});
winston.add(winston.transports.File, { 
	filename: './logs/app.log',
	level: 'error',
	maxsize: 10 * 1024 * 1024, // max log filesize
	colorize: true,
	handleExceptions: true,
	exitOnError: true,
});


// levels: info, warn, error
var log = function () {
	return winston.log.apply(winston, arguments);
};


// public api
exports.log = log;
