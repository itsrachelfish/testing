var $ = require('jquery');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass(
{
    componentDidMount: function()
    {
        $('body').on('keydown', '.search', this.keyPressed);
    },

    componentWillUnmount: function() {
        $('body').off('keydown', '.search', this.keyPressed);
    },

    keyPressed: function(event)
    {
        // When the user presses enter
        if(event.which == '13')
        {
            var query = $(event.target).val();
            window.globalHistory.pushState(null, '/search/' + query);
        }
    },
    
    render: function()
    {
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
                        
                        <span className="messages">0 Messages</span>
                    </div>
                </div>
            </header>
        );
    }
});

module.exports = Header;
