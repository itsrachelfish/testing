var $ = require('jquery');
var React = require('react');
var MessageStore = require('../../stores/messageStore');
var MessageActions = require('../../actions/messageActions');
var FriendStore = require('../../stores/friendStore');

var Messages = React.createClass(
{
    updateInterval: false,

    getInitialState: function()
    {
        return { messages: MessageStore.listMessages() };
    },

    componentWillMount: function()
    {
        FriendStore.addChangeListener(this.onChange);
        MessageStore.addChangeListener(this.onChange);

        // Get new messages every 5 seconds
        this.updateInterval = setInterval(MessageActions.newMessages, 5 * 1000);

        // Mark message as read when you click on it
        $('body').on('click keydown', '.message', this.readMessage);

        // Send a message when you type into the message input
        $('body').on('keydown', '.message input', this.sendMessage);
    },

    componentDidUpdate: function(prevProps)
    {
        $('.conversation').each(function()
        {
            $(this).scrollTop($(this).find('.inner').height());
        });
    },

    componentWillUnmount: function()
    {
        FriendStore.removeChangeListener(this.onChange);
        MessageStore.removeChangeListener(this.onChange);
        clearInterval(this.updateInterval);

        $('body').off('click keydown', '.message', this.readMessage);
        $('body').off('keydown', '.message input', this.sendMessage);
    },

    onChange: function()
    {
        this.setState({ messages: MessageStore.listMessages() });
    },

    closeMessage: function(event)
    {
        var message = $(event.target).parents('.message');
        var friend = message.find('.name').text();

        MessageActions.closeMessage(friend);
    },

    readMessage: function(event)
    {
        var message = $(event.target).parents('.message');
        var friend = message.find('.name').text();

        MessageActions.readMessage(friend);
    },  

    sendMessage: function(event)
    {
        if(event.which == 13)
        {
            // Get event data
            var message = $(event.target).parents('.message');
            var friend = message.find('.name').text();
            var text = $(event.target).val();

            // Clear text box
            $(event.target).val('');

            // Trigger action
            MessageActions.sendMessage(friend, text);
        }
    },
    
    render: function()
    {
        function displayLine(friend, line)
        {
            if(line.source == 'you')
            {
                return (
                    <div className="you">
                        <span className="text">{ line.text }</span>
                    </div>
                );
            }
            else if(line.source == 'them')
            {
                return (
                    <div className="them">
                        <img className="avatar left" src={ "/img/" + friend.avatar } />
                        <span className="text">{ line.text }</span>
                    </div>
                );
            }
        }

        function displayMessage(friend, messages)
        {
            var conversation = [];
            var scope = this;
            
            messages.forEach(function(line)
            {
                conversation.push(displayLine.call(scope, friend, line));
            });

            return (
                <div className="message">
                    <div className="title">
                        <span className={"status " + friend.status }></span>
                        <span className="name">{ friend.name }</span>
                        <span className="close right" onClick={ this.closeMessage }>X</span>
                    </div>

                    <div className="conversation">
                        <div className="inner">
                            { conversation }
                        </div>
                    </div>

                    <div className="input">
                        <input type="text" />
                    </div>
                </div>
            );
        }
        
        function displayMessages(messages)
        {
            var output = [];
            var scope = this;

            // Reverse array so the people who message you first stay first
            var friendNames = Object.keys(messages).reverse();
            friendNames.forEach(function(friendName)
            {
                var friend = FriendStore.getFriend(friendName);
                var conversation = messages[friendName].conversation;

                // Skip closed messages
                if(messages[friendName].status != 'closed')
                {
                    output.push(displayMessage.call(scope, friend, conversation));
                }
            });

            return output;
        }

        return (
            <div className="message-wrap">
                { displayMessages.call(this, this.state.messages) }
            </div>
        );
    }
});

module.exports = Messages;
