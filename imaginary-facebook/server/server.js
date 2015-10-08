// Start the server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
http.listen(1337);

// Serve static files
app.use(express.static("../static/"));
