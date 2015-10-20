var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var friends = [];

var FriendStore = assign({}, EventEmitter.prototype,
{
    addChangeListener: function(callback)
    {
        this.on('change', callback);
    },

    removeChangeListener: function(callback)
    {
        this.removeListener('change', callback);
    },

    listFriends: function()
    {
        return friends;
    }
});

Dispatcher.register(function(action)
{
    switch(action.actionType)
    {
        case 'getFriends':
            friends = action.friends;
            FriendStore.emit('change');
        break;
    }
});

module.exports = FriendStore;
