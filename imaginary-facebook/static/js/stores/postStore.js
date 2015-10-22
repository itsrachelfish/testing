var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var posts = [];

var PostStore = assign({}, EventEmitter.prototype,
{
    addChangeListener: function(callback)
    {
        this.on('change', callback);
    },

    removeChangeListener: function(callback)
    {
        this.removeListener('change', callback);
    },

    listPosts: function()
    {
        return posts;
    }
});

Dispatcher.register(function(action)
{
    switch(action.actionType)
    {
        case 'getPosts':
            posts = action.posts;
            PostStore.emit('change');
        break;
    }
});

module.exports = PostStore;
