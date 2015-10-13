var React = require('react');
var Home = require('./pages/home');

$(document).ready(function()
{
    React.render(<Home/>, $('body')[0]);
});
