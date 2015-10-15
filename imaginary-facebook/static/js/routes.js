var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Routes =
(
    <Router>
        <Route name="app" path="/" handler={require('./views/app')}>

        </Route>
    </Router>
);

module.exports = Routes;
