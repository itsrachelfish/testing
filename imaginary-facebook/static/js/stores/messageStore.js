var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var messages = {};
var unread = 0;

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
    },

    // Function to check message list for count of unread messages
    checkUnread: function()
    {
        unread = 0;
        
        var friendNames = Object.keys(messages);
        friendNames.forEach(function(friend)
        {
            if(messages[friend].status == 'unread')
            {
                unread++;
            }
        });
    },

    // Function to output the number of unread messages
    getUnread: function()
    {
        return unread;
    }
});

Dispatcher.register(function(action)
{
    switch(action.actionType)
    {
        // Get all messages from the server
        case 'getMessages':
            messages = action.messages;
            MessageStore.checkUnread();
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
                    messages[friend].status = action.messages[friend].status;

                    // Limit conversation to most recent 50 lines
                    messages[friend].conversation = messages[friend].conversation.slice(-50);
                }
                else
                {
                    messages[friend] = action.messages[friend];
                }
            });

            MessageStore.checkUnread();
            MessageStore.emit('change');
        break;

        // Mark a message as closed
        case 'closeMessage':
            var friend = action.friend;

            if(messages[friend])
            {
                messages[friend].status = 'closed';
            }

            MessageStore.checkUnread();
            MessageStore.emit('change');
        break;

        // Mark a message as read
        case 'readMessage':
            var friend = action.friend;

            if(messages[friend])
            {
                messages[friend].status = 'read';
            }

            MessageStore.checkUnread();
            MessageStore.emit('change');
        break;
    }
});

module.exports = MessageStore;
