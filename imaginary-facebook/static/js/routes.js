var createHistory = require('history/lib/createBrowserHistory');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./components/app');
var Home = require('./components/home/homePage');
var Search = require('./components/search/searchPage');
var NotFound = require('./components/notFound');

window.globalHistory = createHistory();

var Routes = React.createClass(
{
    render: function()
    {
        return (
            <Router history={ globalHistory }>
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
