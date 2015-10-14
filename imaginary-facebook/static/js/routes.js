var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Routes =
(
    <Router>
        <Route name="app" path="/" handler={require('./views/app')}>

        </Route>
    </Router>
);

module.exports = Routes;
