var React = require('react');

var NotFound = React.createClass(
{
    render: function()
    {
        return (
            <div className="cool">
                <h1>Page Not Found</h1>
                <p>Get out!</p>
            </div>
        );
    }
});

module.exports = NotFound;
