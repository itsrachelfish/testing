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

    closeMessage: function(friend)
    {
        $.post('/api/messages/status', {friend: friend, status: 'closed'});
        
        var action =
        {
            actionType: 'closeMessage',
            friend: friend
        };
        
        Dispatcher.dispatch(action);
    },

    readMessage: function(friend)
    {
        $.post('/api/messages/status', {friend: friend, status: 'read'});
        
        var action =
        {
            actionType: 'readMessage',
            friend: friend
        };
        
        Dispatcher.dispatch(action);
    }
};

module.exports = MessageActions;
