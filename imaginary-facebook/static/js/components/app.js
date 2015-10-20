var React = require('react');
var Header = require('./common/header');
var FriendList = require('./common/friendList');
var Ads = require('./common/ads');

var App = React.createClass(
{
    render: function()
    {
        return (
            <div>
                <Header />
                <FriendList />

                <section className="content">
                    <Ads />
                    {this.props.children}
                </section>
            </div>
        );
    }
});

module.exports = App;
