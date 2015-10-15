var React = require('react');

var Ads = React.createClass(
{
    render: function()
    {
        return (
            <aside className="sponsored right">
                <span className="title">SPONSORED</span>

                <a className="ad" href="https://wetfish.net/cats" target="_blank">
                    <img src="/img/ad-1.gif" />

                    <div className="title">
                        Litterbox Rollercoaster
                    </div>

                    <div className="text">
                        Ever wonder if your cats are having TOO MUCH FUN?
                    </div>
                </a>
                
                <hr />

                <a className="ad" href="http://crimethinc.com/" target="_blank">
                    <img src="/img/ad-2.gif" />

                    <div className="title">
                        Anarchy rules!
                    </div>

                    <div className="text">
                        Actually, just kidding.<br />There are no rulers.
                    </div>
                </a>
            </aside>
        );
    }
});

module.exports = Ads;
