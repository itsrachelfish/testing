// Start the server
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
http.listen(1337);


// Initialize friend data
var friends = require('./friends');
friends.init();

// Randomly change friend statuses every 30 seconds
setInterval(friends.update, 30 * 1000);


// Serve static files
app.use(express.static("../static/"));

// API requests
app.get('/api/friends', function(req, res)
{
    res.send(friends.list);
});

// Catchall to handle browser history URLs
app.get('/*', function (req, res)
{
    res.sendFile(path.resolve(__dirname + "/../static/index.html"));
});


console.log("Imaginary Facebook Server Started.");
