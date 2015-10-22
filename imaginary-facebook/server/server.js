// Start the server
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
http.listen(1337);


// Initialize server-side data
var friends = require('./friends');
var posts = require('./posts');
var messages = require('./messages');
friends.init();
posts.init();

// Randomly change friend statuses every 30 seconds
setInterval(friends.update, 30 * 1000);

// Randomly post a message every minute
setInterval(posts.update, 60 * 1000);

// Randomly send a message every 10 seconds
setInterval(messages.update, 10 * 1000);


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
