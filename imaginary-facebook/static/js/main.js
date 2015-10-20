var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('./routes');
var FriendActions = require('./actions/friendActions');

// Initialize app data
FriendActions.getFriends();

// Render page
ReactDOM.render(<Routes />, document.getElementById('app'));

