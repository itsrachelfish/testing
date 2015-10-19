// Start the server
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
http.listen(1337);

// Serve static files
app.use(express.static("../static/"));

// API requests
app.get('/api/buddies', function(req, res)
{
    // Loop through buddies and generate random data
    var buddies = require('./buddies');

    buddies.forEach(function(buddy, index)
    {
        if(Math.round(Math.random()))
        {
            buddy.status = 'online';
        }
        else
        {
            buddy.status = 'offline';
        }
        
        buddies[index] = buddy;
    });

    res.send(buddies);
});

// Catchall to handle browser history URLs
app.get('/*', function (req, res)
{
    res.sendFile(path.resolve(__dirname + "/../static/index.html"));
});

console.log("Imaginary Facebook Server Started.");
