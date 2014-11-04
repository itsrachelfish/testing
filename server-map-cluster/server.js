// Basic express server for map stuff

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));
app.listen(3333);