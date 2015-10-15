var React = require('react');

var Header = React.createClass(
{
    render: function()
    {
        return (
            <header>
                <div className="inside">
                    <div className="left">
                        <span className="logo">f</span>
                        <input className="search" placeholder="Search Fartbook" />
                    </div>

                    <div className="right">
                        <span className="user">
                            <img className="avatar" src="/img/avatar.png" />
                            <span className="name">Buttmaster</span>
                        </span>
                        <span className="messages">0 Messages</span>
                    </div>
                </div>
            </header>
        );
    }
});

module.exports = Header;
