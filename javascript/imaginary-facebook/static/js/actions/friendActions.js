var $ = require('jquery');
var Dispatcher = require('../dispatcher');

var FriendActions =
{
    getFriends: function()
    {
        $.getJSON('/api/friends', function(list)
        {
            var action =
            {
                actionType: 'getFriends',
                friends: list
            };
            
            Dispatcher.dispatch(action);
        });
    }
};

module.exports = FriendActions;
