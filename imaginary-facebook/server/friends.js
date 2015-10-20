function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

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
        var randomFriend = randomInt(0, friends.list.length);

        if(Math.round(Math.random()))
        {
            friends.list[randomFriend].status = 'online';
        }
        else
        {
            friends.list[randomFriend].status = 'offline';
        }
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
