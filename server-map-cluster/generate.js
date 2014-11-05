// Generate random coordinates to be saved in data.js

// Using random locations gives results that are too uniform. We need to use something with more... clusters!

var $ = require('jquery');

// Get saved HTML data
var dom = "<body><div>hi lol<b>hey</b></div></body>";

$(dom).find('b').each(function()
{
    console.log($(this));
});


/*
    Loop through it find:
    * Population
    * Land area
    * Location
*/

// Loop through each city to generate markers based on population
// For i = 0; i < population divided by 1000
// Random jitter = square root of the land area
// Around the location

/*
function latlng()
{
    // Latitude (-90 to 90)
    var lat = (Math.floor(Math.random() * 180) - 90) + Math.random();

    // Longitude (-180 to 180)
    var lng = (Math.floor(Math.random() * 360) - 180) + Math.random();

    return {lat: lat, lng: lng};
}

var data = [];

for(var i = 0; i < 20000; i++)
{
    var location = latlng();

    // Only generate locations within North America (provided by https://www.flickr.com/places/info/24865672)
    if(location.lat > 5.4995 && location.lat < 63.1621 &&
        location.lng > -147.2764 && location.lng < -52.2330)
    {
        data.push(location);
    }
    else
    {
        i--;
    }
}
*/

console.log("module.exports = "+JSON.stringify(data));