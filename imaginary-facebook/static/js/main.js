var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('./routes');
var BuddyActions = require('./actions/buddyActions');

// Initialize app data
BuddyActions.fetchBuddies();

// Render page
ReactDOM.render(<Routes />, document.getElementById('app'));

