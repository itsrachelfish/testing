var events = require('./events');

module.exports = {
    init: function(app) {
        app.get('/', function (req, res) {
          res.send('Hello welcome to my demo! Feel free to visit /hello and /world');
          events.emit('page-loaded', '/');
        });

        app.get('/hello', function (req, res) {
          res.send('world');
          events.emit('page-loaded', '/hello');
        });

        app.get('/world', function (req, res) {
          res.send('hello');
          events.emit('page-loaded', '/world');
        });
    }
};
