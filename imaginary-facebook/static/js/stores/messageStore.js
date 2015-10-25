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
                    messages[friend].conversation = messages[friend].conversation.concat(action.messages[friend].conversation);
                    messages[friend].status = actions.messages[friend].status;
                }
                else
                {
                    messages[friend] = action.messages[friend];
                }
            });

            MessageStore.emit('change');
        break;

        // Mark a message as closed
        case 'closeMessage':
            var friend = action.friend;

            if(messages[friend])
            {
                messages[friend].status = 'closed';
            }

            MessageStore.emit('change');
        break;
    }
});

module.exports = MessageStore;
