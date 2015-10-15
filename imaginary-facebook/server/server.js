// Start the server
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
http.listen(1337);

// Serve static files
app.use(express.static("../static/"));

// Catchall to handle browser history URLs
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + "/../static/index.html"));
});

console.log("Imaginary Facebook Server Started.");
