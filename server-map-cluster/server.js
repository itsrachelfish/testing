// Basic express server for map stuff

var express = require('express');
var markers = require('./data');
var app = express();

app.get('/markers', function(req, res)
{
    res.send(JSON.stringify(markers));
    res.end();
});

app.use(express.static(__dirname + '/static'));
app.listen(3333);