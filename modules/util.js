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

var merge = function () {
	var result = {},
			args = Array.prototype.slice.call(arguments),
			mergeRecursive = function (obj1, obj2) {
				for (var p in obj2) {
					try {
						if ( obj2[p].constructor==Object ) {
							obj1[p] = mergeRecursive(obj1[p], obj2[p]);
						}
						else {
							obj1[p] = obj2[p];
						}
					} 
					catch(e) {
						obj1[p] = obj2[p];
					}
				}
				return obj1;
			};

	args.forEach( function (obj) {
		mergeRecursive(result, obj);
	});
	return result;
};


var pluralize = function (str) {
	var rules = [
		[/(m)an$/gi, '$1en'],
		[/(pe)rson$/gi, '$1ople'],
		[/(child)$/gi, '$1ren'],
		[/^(ox)$/gi, '$1en'],
		[/(ax|test)is$/gi, '$1es'],
		[/(octop|vir)us$/gi, '$1i'],
		[/(alias|status)$/gi, '$1es'],
		[/(bu)s$/gi, '$1ses'],
		[/(buffal|tomat|potat)o$/gi, '$1oes'],
		[/([ti])um$/gi, '$1a'],
		[/sis$/gi, 'ses'],
		[/(?:([^f])fe|([lr])f)$/gi, '$1$2ves'],
		[/(hive)$/gi, '$1s'],
		[/([^aeiouy]|qu)y$/gi, '$1ies'],
		[/(x|ch|ss|sh)$/gi, '$1es'],
		[/(matr|vert|ind)ix|ex$/gi, '$1ices'],
		[/([m|l])ouse$/gi, '$1ice'],
		[/(quiz)$/gi, '$1zes'],
		[/s$/gi, 's'],
		[/$/gi, 's']
	];

	var found = rules.filter( function (rule) {
		return str.match(rule[0]);
	});
	if (found[0]) return str.replace(found[0][0], found[0][1]);
	else return str;
};

// public api
exports.log = log;
exports.merge = merge;
exports.pluralize = pluralize;
