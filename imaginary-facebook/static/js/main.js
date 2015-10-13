var $ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var HomePage = require('./views/home/homePage');

$(document).ready(function()
{
    ReactDOM.render(<HomePage/>, $('#app')[0]);
});
