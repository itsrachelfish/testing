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

        // Change the status of a message
        case 'updateMessage':
            var friend = action.friend;
            var status = action.status;

            if(!messages[friend])
            {
                messages[friend] = {conversation: []};
            }

            messages[friend].status = status;
            MessageStore.checkUnread();
            MessageStore.emit('change');
        break;

        // Add a new sent message to the store
        case 'sendMessage':
            var friend = action.friend;
            var text = {source: 'you', text: action.text};
        
            if(!messages[friend])
            {
                messages[friend] = {status: 'read', conversation: []};
            }

            messages[friend].conversation.push(text);
            MessageStore.emit('change');
        break;
    }
});

module.exports = MessageStore;
