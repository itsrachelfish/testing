var React = require('react');
var MessageStore = require('../../stores/messageStore');
var MessageActions = require('../../actions/messageActions');

var Messages = React.createClass(
{
    updateInterval: false,

    getInitialState: function()
    {
        return { messages: MessageStore.listMessages() };
    },

    componentWillMount: function()
    {
        MessageStore.addChangeListener(this.onChange);

        // Get new messages every 5 seconds
        this.updateInterval = setInterval(MessageActions.newMessages, 5 * 1000);
    },

    componentWillUnmount: function()
    {
        MessageStore.removeChangeListener(this.onChange);
        clearInterval(this.updateInterval);
    },

    onChange: function()
    {
        this.setState({ messages: MessageStore.listMessages() });
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
                        <img className="avatar left" src={ "/img/ " + friend.avatar } />
                        <span className="text">{ line.text }</span>
                    </div>
                );
            }
        }

        function displayMessage(friend, messages)
        {
            var conversation = [];
            messages.forEach(function(line)
            {
                conversation.push(displayLine(friend, line));
            });
            
            return (
                <div className="message">
                    <div className="title">
                        <span className={"status " + friend.status }></span>
                        <span className="name">{ friend.name }</span>
                        <span className="close right">X</span>
                    </div>

                    <div className="conversation">
                        { conversation }
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
            var friendNames = Object.keys(messages);
            friendNames.forEach(function(friendName)
            {
                var friend = {name: friendName};
                var conversation = messages[friendName];

                output.push(displayMessage(friend, conversation));
            });

            return output;
        }

        return (
            <div className="message-wrap">
                { displayMessages(this.state.messages) }
            </div>
        );
    }
});

module.exports = Messages;
