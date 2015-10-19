var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _buddies = [];

var BuddyStore = assign({}, EventEmitter.prototype,
{
    addChangeListener: function(callback)
    {
        this.on('change', callback);
    },

    removeChangeListener: function(callback)
    {
        this.removeListener('change', callback);
    },

    listBuddies: function()
    {
        return _buddies;
    }
});

Dispatcher.register(function(action)
{
    switch(action.actionType)
    {
        case 'getBuddies':
            _buddies = action.buddies;
            BuddyStore.emit('change');
        break;
    }
});

module.exports = BuddyStore;
