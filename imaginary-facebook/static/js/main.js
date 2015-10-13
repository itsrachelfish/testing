var $ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./pages/home');

$(document).ready(function()
{
    ReactDOM.render(<Home/>, $('#app')[0]);
});
