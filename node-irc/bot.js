var irc = require('irc');
var config = require('./config/'+process.argv[2]);
var client = new irc.Client(config.server, config.name, config);