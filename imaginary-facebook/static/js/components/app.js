var React = require('react');
var Header = require('./common/header');
var BuddyList = require('./common/buddyList');
var Ads = require('./common/ads');

var App = React.createClass(
{
    render: function()
    {
        return (
            <div>
                <Header />
                <BuddyList />

                <section className="content">
                    <Ads />
                    {this.props.children}
                </section>
            </div>
        );
    }
});

module.exports = App;
