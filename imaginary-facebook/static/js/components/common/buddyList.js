var React = require('react');
var BuddyStore = require('../../stores/buddyStore');

var BuddyList = React.createClass(
{
    getInitialState: function()
    {
        return { buddies: BuddyStore.listBuddies() };
    },

    componentWillMount: function()
    {
        BuddyStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function()
    {
        BuddyStore.removeChangeListener(this.onChange);
    },

    onChange: function()
    {
        this.setState({ buddies: BuddyStore.listBuddies() });
    },
    
    render: function()
    {
        function createBuddy(buddy)
        {
            console.log(buddy);
            return (
                <div className="friend" key={ buddy.name }>
                    <img className="avatar" src={"/img/" + buddy.avatar } />
                    <span className="name">{ buddy.name }</span>
                    <span className={"status " + buddy.status }></span>
                </div>
            );
        }
        
        return (
            <aside className="buddy-list">
                {this.state.buddies.map(createBuddy, this)}                
            </aside>
        );
    }
});

module.exports = BuddyList;
