var $ = require('jquery');
var Dispatcher = require('../dispatcher');

var BuddyActions =
{
    fetchBuddies: function()
    {
        $.getJSON('/api/buddies', function(list)
        {
            var action =
            {
                actionType: 'getBuddies',
                buddies: list
            };
            
            Dispatcher.dispatch(action);
        });
    }
};

module.exports = BuddyActions;
