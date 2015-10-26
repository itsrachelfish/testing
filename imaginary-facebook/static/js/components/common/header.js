var $ = require('jquery');
var React = require('react');
var ReactRouter = require('react-router');
var MessageStore = require('../../stores/messageStore');
var Link = ReactRouter.Link;

var Header = React.createClass(
{
    getInitialState: function()
    {
        return { unread: 0 };
    },
    
    componentWillMount: function()
    {
        MessageStore.addChangeListener(this.onChange);
    },
    
    componentDidMount: function()
    {
        $('body').on('keydown', '.search', this.keyPressed);
    },

    componentWillUnmount: function()
    {
        $('body').off('keydown', '.search', this.keyPressed);
        MessageStore.removeChangeListener(this.onChange);
    },

    keyPressed: function(event)
    {
        // When the user presses enter
        if(event.which == 13)
        {
            var query = $(event.target).val();
            window.globalHistory.pushState(null, '/search/' + query);
        }
    },

    onChange: function()
    {
        this.setState({ unread: MessageStore.getUnread() });
    },
    
    render: function()
    {
        function displayUnread(unread)
        {
            if(unread > 0)
            {
                var messageText = "Messages";

                if(unread == 1)
                {
                    messageText = "Message";
                }
                
                return (
                    <span className="messages active">
                        <span className="count">{ unread }</span>
                        <span className="text">{ messageText }</span>
                    </span>
                );
            }
            else
            {
                return (
                    <span className="messages">
                        <span className="count">0</span>
                        <span className="text">Messages</span>
                    </span>
                );
            }
        }
        
        return (
            <header>
                <div className="inside">
                    <div className="left">
                        <Link to="/">
                            <span className="logo">f</span>
                        </Link>

                        <input className="search" placeholder="Search Fartbook" />
                    </div>

                    <div className="right">
                        <Link to="/">
                            <span className="user">
                                <img className="avatar" src="/img/avatar.png" />
                                <span className="name">Buttmaster</span>
                            </span>
                        </Link>
                        
                        { displayUnread(this.state.unread) }
                    </div>
                </div>
            </header>
        );
    }
});

module.exports = Header;
