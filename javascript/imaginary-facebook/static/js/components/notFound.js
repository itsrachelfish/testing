var React = require('react');

var NotFound = React.createClass(
{
    render: function()
    {
        return (
            <div className="post-wrap">
                <div>
                    <h1>Page Not Found</h1>
                    <p>Get out!</p>
                </div>
            </div>
        );
    }
});

module.exports = NotFound;
