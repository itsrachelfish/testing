var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var history = require('./history');
var App = require('./components/app');
var Home = require('./components/home/homePage');
var Search = require('./components/search/searchPage');
var NotFound = require('./components/notFound');

var Routes = React.createClass(
{
    render: function()
    {
        return (
            <Router history={ history }>
                <Route path="/" component={ App }>
                    <IndexRoute component={ Home } />
                    <Route path="search/*" component={ Search } />
                    <Route path="*" component={ NotFound } />
                </Route>
            </Router>
        );
    }
});

module.exports = Routes;
