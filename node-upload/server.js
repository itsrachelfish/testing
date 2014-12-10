var fs = require('fs');
var busboy = require('connect-busboy');
var express = require('express');
var app = express();

app.use(busboy()); 

app.get('/', function (req, res)
{
    res.send('<form method="post" enctype="multipart/form-data"><input type="file" name="file"><input type="submit" value="Upload"></form>');
});

// Make sure the uploads directory exists
fs.mkdir('uploads');

app.post('/', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.end('File uploaded!');
        });
    });
});

var server = app.listen(1337, function ()
{

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

