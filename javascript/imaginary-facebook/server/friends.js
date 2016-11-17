var helper = require('./helper');

// Functions for generating friend data
var friends =
{
    // Generate the initial state of online and offline friends
    init: function()
    {
        friends.list.forEach(function(friend, index)
        {
            if(Math.round(Math.random()))
            {
                friend.status = 'online';
            }
            else
            {
                friend.status = 'offline';
            }
            
            friends.list[index] = friend;
        });
    },

    // Randomly sign friends on and off
    update: function()
    {
        var randomFriend = helper.random(0, friends.list.length);

        if(Math.round(Math.random()))
        {
            friends.list[randomFriend].status = 'online';
        }
        else
        {
            friends.list[randomFriend].status = 'offline';
        }
    },

    // Return a list of currently online friends
    online: function()
    {
        var online = [];

        friends.list.forEach(function(friend)
        {
            if(friend.status == 'online')
            {
                online.push(friend);
            }
        });

        return online;
    },

    // Sample data for friends
    list:
    [
        {name: 'Fox McCloud', avatar: 'friend-1.png'},
        {name: 'Rachel Fish', avatar: 'friend-2.png'},
        {name: 'River God', avatar: 'friend-3.jpg'},
        {name: 'Phantom Fish', avatar: 'friend-4.png'},
        {name: 'Washing Girl', avatar: 'friend-5.jpg'},
    ]
}

module.exports = friends;
