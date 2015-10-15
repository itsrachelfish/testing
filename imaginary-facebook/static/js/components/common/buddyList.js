var React = require('react');

var BuddyList = React.createClass(
{
    render: function()
    {
        return (
            <aside className="buddy-list">
                <div className="friend">
                    <img className="avatar" src="/img/friend-1.png" />
                    <span className="name">Fox McCloud</span>
                </div>

                <div className="friend">
                    <img className="avatar" src="/img/friend-2.png" />
                    <span className="name">Rachel Fish</span>
                </div>

                <div className="friend">
                    <img className="avatar" src="/img/friend-3.jpg" />
                    <span className="name">River God</span>
                </div>

                <div className="friend">
                    <img className="avatar" src="/img/friend-4.png" />
                    <span className="name">Phantom Fish</span>
                </div>

                <div className="friend">
                    <img className="avatar" src="/img/friend-5.jpg" />
                    <span className="name">Washing Girl</span>
                </div>
            </aside>
        );
    }
});

module.exports = BuddyList;
