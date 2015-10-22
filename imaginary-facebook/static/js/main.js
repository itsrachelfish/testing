var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('./routes');
var FriendActions = require('./actions/friendActions');
var PostActions = require('./actions/postActions');
var MessageActions = require('./actions/messageActions');

// Initialize app data
FriendActions.getFriends();
PostActions.getPosts();

// Render page
ReactDOM.render(<Routes />, document.getElementById('app'));

