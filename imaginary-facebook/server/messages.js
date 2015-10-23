var friends = require('./friends');
var helper = require('./helper');

// Functions for generating random messages
var messages =
{
    // List of all messages
    list: {},

    // List of recent messages
    recent: {},
    
    // Function to create a random message from an online friend
    update: function()
    {
        var online = friends.online();
        if(!online.length) return;

        var randomFriend = helper.random(0, online.length);
        friend = online[randomFriend];

        // Initialize an empty array of messages if none is defined for this friend
        if(!messages.list[friend.name])
        {
            messages.list[friend.name] = {conversation: []};
        }

        if(!messages.recent[friend.name])
        {
            messages.recent[friend.name] = {conversation: []};
        }

        // Add random message to the list of messages
        var randomMessage = helper.random(0, messages.sample.length);
        messages.list[friend.name].conversation.push({source: 'them', text: messages.sample[randomMessage]});
        messages.recent[friend.name].conversation.push({source: 'them', text: messages.sample[randomMessage]});

        // Set the message status to unread
        messages.list[friend.name].status = 'unread';
        messages.recent[friend.name].status = 'unread';
    },

    // Function to flush currently queued messages to a client
    flush: function()
    {
        var recent = messages.recent;
        messages.recent = {};
        
        return recent;
    },

    sample:
    [
        "hey",
        "hi",
        "HEY",
        "Hi there!",
        "Hello",
        "Heya~",
        "Howdy.",
        "How are you?",
        "What's up?",
        "How's life?",
        "Wow!",
        "wow.",
        "That's great!",
        "I love you",
        "You're wonderful",
        "how many times have you farted today?",
        "Do you ever wonder how many trees there are?",
        "Have you ever hugged a tree?",
        "I'm doing great",
        "I'm ok",
        "GREAT BALLS OF FIRE",
        "Uhhhhhh....",
        "How's your mom?",
        "what is life?",
        "is this real life?",
        "what does it mean to be alive?",
        "This is great",
        "Good idea.",
        "Great answer!",
        "What's your favorite song?",
        "Who is your favorite musician?",
        "Do you like art?",
        "When was the last time you went outside?",
        "Why are you still reading this...",
        "See you later",
        "Bye.",
        "Bye!",
        "See ya",
        "cya",
        "peace",
        "OVER AND OUT"
    ]
}

module.exports = messages;
