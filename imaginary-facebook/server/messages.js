var friends = require('./friends');
var helper = require('./helper');

// Functions for generating random messages
var messages =
{
    // List of all messages
    list: {'Rachel Fish': [{source: 'them', text: 'hi'}]},

    // List of recent messages
    recent: {},
    
    // Function to create a random message
    update: function()
    {

    },

    // Function to flush currently queued messages to a client
    flush: function()
    {
        var recent = messages.recent;
        messages.recent = {};
        
        return recent;
    }
}

module.exports = messages;
