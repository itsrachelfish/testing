var friends = require('./friends');
var helper = require('./helper');

// Functions for generating random posts
var posts =
{
    // List of created posts
    list: [],

    // Generate three random posts to start
    init: function()
    {
        console.log(friends.list);
    },

    // Randomly create a post based on online friends
    update: function()
    {
        console.log(friends.list);
    },

    // List of possible sample data that can be posted
    sample:
    [
        {name: 'Fox McCloud', avatar: 'friend-1.png'},
        {name: 'Rachel Fish', avatar: 'friend-2.png'},
        {name: 'River God', avatar: 'friend-3.jpg'},
        {name: 'Phantom Fish', avatar: 'friend-4.png'},
        {name: 'Washing Girl', avatar: 'friend-5.jpg'},
    ]
}

module.exports = posts;
