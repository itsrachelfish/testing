var webPage = require('webpage');
var page = webPage.create();

page.open("../static/index.html", function (status)
{
    var google = page.evaluate(function()
    {
        return google;
    });

    console.log(JSON.stringify(google));

    //Page is loaded!
    phantom.exit();
});