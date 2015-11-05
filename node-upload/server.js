var fs = require('fs');
var busboy = require('connect-busboy');
var express = require('express');
var app = express();

app.use(busboy()); 
app.enable('trust proxy');

function date()
{
    return new Date().toLocaleString();
}

function log()
{
    var input = [];
    for(var i = 0, l = arguments.length; i < l; i++)
    {
        input.push(arguments[i]);
    }
    
    input.unshift(date(), ' - ');
    console.log.apply(this, input);
}

function end(res, message)
{
    log(message);
    res.end(message);
}

app.get('/', function (req, res)
{
    log('User visited:', req.ip);
    res.send('<form method="post" enctype="multipart/form-data"><input type="file" name="file"><input type="submit" value="Upload"></form>');
});

// Make sure the uploads directory exists
fs.mkdir('uploads', function(error)
{
    if(error)
    {
        if(error.code == 'EEXIST')
        {
            log('./upload directory already exists!');
        }
        else
        {
            log('There was an error :O', error);
        }
    }
    else
    {
        log('./upload directory created');
    }
});

app.post('/', function(req, res)
{
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename)
    {
        log("Uploading:" , filename); 
        log("Uploaded by:", req.ip, '-', req.headers['user-agent']);

        if(!filename)
        {
            end(res, 'No file uploaded.');
            return;
        }

        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function()
        {
            end(res, 'File uploaded!');
        });

        fstream.on('error', function()
        {
            log('There was an error!', arguments);
            res.end('There was an error uploading! :(');
        });
    });
});

var server = app.listen(1337, function()
{
    var host = server.address().address;
    var port = server.address().port;

    log('Uploader listening at http://' + host + ':' + port)
})

