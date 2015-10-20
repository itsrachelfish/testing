var React = require('react');
var FriendStore = require('../../stores/friendStore');

var FriendsList = React.createClass(
{
    getInitialState: function()
    {
        return { friends: FriendStore.listFriends() };
    },

    componentWillMount: function()
    {
        FriendStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function()
    {
        FriendStore.removeChangeListener(this.onChange);
    },

    onChange: function()
    {
        this.setState({ friends: FriendStore.listFriends() });
    },
    
    render: function()
    {
        function createFriends(friend)
        {
            console.log(friend);
            return (
                <div className="friend" key={ friend.name }>
                    <img className="avatar" src={"/img/" + friend.avatar } />
                    <span className="name">{ friend.name }</span>
                    <span className={"status " + friend.status }></span>
                </div>
            );
        }
        
        return (
            <aside className="friend-list">
                {this.state.friends.map(createFriends, this)}                
            </aside>
        );
    }
});

module.exports = FriendsList;
