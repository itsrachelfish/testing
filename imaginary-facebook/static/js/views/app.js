var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    render: function()
    {
        return
        (
            <div>
                <Header/>
                <RouteHandler/>
            </div>
        );
    }
});

module.exports = App;
