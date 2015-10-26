var $ = require('jquery');
var Dispatcher = require('../dispatcher');

var PostActions =
{
    getPosts: function()
    {
        $.getJSON('/api/posts', function(list)
        {
            var action =
            {
                actionType: 'getPosts',
                posts: list
            };
            
            Dispatcher.dispatch(action);
        });
    },

    newPost: function(text)
    {
        $.post('/api/posts', {text: text});

        var action =
        {
            actionType: 'newPost',
            friend: {name: 'Buttmaster', avatar: 'avatar.png'},
            text: text,
            date: new Date().getTime()
        };
        
        Dispatcher.dispatch(action);
    },
};

module.exports = PostActions;
