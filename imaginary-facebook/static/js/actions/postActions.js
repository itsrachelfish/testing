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
    }
};

module.exports = PostActions;
