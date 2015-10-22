var React = require('react');
var PostStore = require('../../stores/postStore');
var PostActions = require('../../actions/postActions');

var HomePage = React.createClass(
{
    updateInterval: false,

    getInitialState: function()
    {
        return { posts: PostStore.listPosts() };
    },

    componentWillMount: function()
    {
        PostStore.addChangeListener(this.onChange);

        // Update post data every 30 seconds
        this.updateInterval = setInterval(PostActions.getPosts, 3 * 1000);
    },

    componentWillUnmount: function()
    {
        PostStore.removeChangeListener(this.onChange);
        clearInterval(this.updateInterval);
    },

    onChange: function()
    {
        this.setState({ posts: PostStore.listPosts() });
    },
    
    render: function()
    {
        function displayTime(time)
        {
            var difference = new Date().getTime() - time;
            var minutes = Math.floor(difference / 1000 / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            var text = "";

            if(days > 0) 
            {
                text += days + ((days > 1) ? " days" : " day");
            }
            else if(hours > 0)
            {
                text += hours + ((hours > 1) ? " hours" : " hour");
            }
            else if(minutes > 0)
            {
                text += minutes + ((minutes > 1) ? " mins" : " min");
            }
            else
            {
                text = "just now";
            }
            
            return text;
        }

        function displayLine(line)
        {
            return (
                <div>
                    { line } <br />
                </div>
            );
        }

        function displayText(text)
        {
            if(!text) return false;
            var lines = text.split('\n');

            return (
                <div className="text">
                    { lines.map(displayLine, this) }
                </div>
            );
        }

        function displayImage(image)
        {
            if(!image) return false;
            
            return (
                <div className="img">
                    <img src={"/img/" + image } />
                </div>
            );
        }

        function createPosts(post)
        {
            return (
                <article className="post">
                    <div className="info">
                        <a href="">
                            <img className="avatar left" src={ "/img/" + post.friend.avatar } />
                            <span className="name">{ post.friend.name }</span>
                        </a>
                        
                        <div className="time">{ displayTime(post.time) }</div>
                    </div>

                    { displayText(post.text) }
                    { displayImage(post.image) }
                </article>
            );
        }
        
        return (
            <div className="post-wrap">
                <div className="new-post">
                    <div>
                        <img className="avatar" src="/img/avatar.png" />
                        <textarea className="text" placeholder="What's on your mind?"></textarea>
                    </div>

                    <hr />

                    <div className="buttons">
                        <span className="submit">Post</span>
                    </div>
                </div>

                { this.state.posts.map(createPosts, this) }
            </div>
        );
    }
});

module.exports = HomePage;
