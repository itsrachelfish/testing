var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;


var App = require('./components/app');
var Home = require('./components/home/homePage');
var NotFound = require('./components/notFound');

//var Routes = require('./routes');

ReactDOM.render((
    <Router>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home } />
            <Route path="*" component={ NotFound } />
        </Route>
    </Router>
), document.getElementById('app'));

