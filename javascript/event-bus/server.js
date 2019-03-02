var express = require('express');
var app = express();
var http = require('http').Server(app);
var routes = require('./routes');
var events = require('./events');

http.listen(3000);
routes.init(app);

events.on('page-loaded', function(page) {
    console.log('User loaded page:', page);
});

console.log('Demo server is running');
