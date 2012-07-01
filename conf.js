var path = require('path');


var conf = {};

conf.DEVELOPMENT = 'development';
conf.PRODUCTION = 'production'

conf.env = process.env.NODE_ENV || conf.DEVELOPMENT;

conf.favicon = path.join('public', 'img', 'favicon.ico');

conf.static = {};
conf.static.maxAge = 120 * 24*60*60 * 1000; // 120 days
conf.static.publicDir = path.join( __dirname, 'public' );

conf.cookie = {};
conf.cookie.secret = 'kl75758C29xPo66N70668DGeJ6iq5vi7d7S1p5ux123V';
conf.cookie.key = 'simplebase.sid';
conf.cookie.maxAge = 120 * 24*60*60 * 1000 // 120 days

conf.http = {};
conf.http.port = 3000;
conf.http.host = '192.168.80.131';

conf.mongo = {};
conf.mongo.host = 'localhost';
conf.mongo.port = 27017;
conf.mongo.db = "simplebase";
conf.mongo.url = "mongodb://"+conf.mongo.host+":"+conf.mongo.port+"/"+conf.mongo.db;

module.exports = conf;
