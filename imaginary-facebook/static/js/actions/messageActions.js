var $ = require('jquery');
var Dispatcher = require('../dispatcher');

var MessageActions =
{
    getMessages: function()
    {
        $.getJSON('/api/messages', function(list)
        {
            var action =
            {
                actionType: 'getMessages',
                messages: list
            };
            
            Dispatcher.dispatch(action);
        });
    },

    newMessages: function()
    {
        $.getJSON('/api/messages/new', function(list)
        {
            var action =
            {
                actionType: 'newMessages',
                messages: list
            };
            
            Dispatcher.dispatch(action);
        });
    },

    // General action for updating the status of a message
    updateMessage: function(friend, status)
    {
        $.post('/api/messages/status', {friend: friend, status: status});
        
        var action =
        {
            actionType: 'updateMessage',
            friend: friend,
            status: status
        };
        
        Dispatcher.dispatch(action);
    },

    sendMessage: function(friend, text)
    {
        $.post('/api/messages/new', {friend: friend, text: text});
        
        var action =
        {
            actionType: 'sendMessage',
            friend: friend,
            text: text
        };
        
        Dispatcher.dispatch(action);
    }
};

module.exports = MessageActions;
