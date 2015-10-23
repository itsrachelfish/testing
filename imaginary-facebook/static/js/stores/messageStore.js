var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var messages = {};

var MessageStore = assign({}, EventEmitter.prototype,
{
    addChangeListener: function(callback)
    {
        this.on('change', callback);
    },

    removeChangeListener: function(callback)
    {
        this.removeListener('change', callback);
    },

    listMessages: function()
    {
        return messages;
    }
});

Dispatcher.register(function(action)
{
    switch(action.actionType)
    {
        // Get all messages from the server
        case 'getMessages':
            messages = action.messages;
            MessageStore.emit('change');
        break;

        // Loop through data and add new messages to the store
        case 'newMessages':
            var friendNames = Object.keys(action.messages);
            friendNames.forEach(function(friend)
            {
                if(messages[friend])
                {
                    messages[friend].concat(action.messages[friend]);
                }
                else
                {
                    messages[friend] = action.messages[friend];
                }
            });
            
            MessageStore.emit('change');
        break;
    }
});

module.exports = MessageStore;
