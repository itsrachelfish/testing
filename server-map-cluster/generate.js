// Generate random coordinates to be saved in data.js

// Using random locations gives results that are too uniform. We need to use something with more... clusters!
var cheerio = require('cheerio');
var fs = require('fs');
var GeoPoint = require('geopoint');

// Get saved HTML data
var $ = cheerio.load(fs.readFileSync('./static/population.html'));

// Remove garbage data
$('.sortkey').remove();
$('br').replaceWith('/');

function sanitize(text)
{
    return text.toString().replace(/[\n\r,]/g, '');
}

var data = [];
var markers = [];

// Loop through each row
$('tr').each(function()
{
    // Find:
    // - Population
    var population = sanitize($(this).find('td').eq(3).text());

    // - Land area
    var area = sanitize($(this).find('td').eq(6).text());

    // - Coordinates
    var coords = sanitize($(this).find('td').eq(8).text());

    if(population && area && coords)
    {
        // Convert N/W coordinates to lat/lng
        coords = coords.split(' ');

        var lat = parseFloat(coords[0].toString().replace('°N', ''));
        var lng = parseFloat(coords[1].toString().replace('°W', '')) * -1;

        // Extract approximate area from text
        area = area.split('/');
        area = Math.sqrt(parseFloat(area[0]));

        // Store extracted data
        data.push({population: population, area: area, location: {lat: lat, lng: lng}});
    }
});

// Loop through extracted data
for(var d_idx = 0, d_l = data.length; d_idx < d_l; d_idx++)
{
    var city = data[d_idx];
    city.point = new GeoPoint(city.location.lat, city.location.lng);

    var bounds = city.point.boundingCoordinates(city.area);
    var sw = {lat: bounds[0]._degLat, lng: bounds[0]._degLon};
    var ne = {lat: bounds[1]._degLat, lng: bounds[1]._degLon};

    // Loop to generate markers based on population
    for(var c_idx = 0, c_l = parseInt(city.population) / 10000; c_idx < c_l; c_idx++)
    {
        var random_lat = Math.random() * (ne.lat - sw.lat) + sw.lat;
        var random_lng = Math.random() * (ne.lng - sw.lng) + sw.lng;

        markers.push({lat: random_lat, lng: random_lng});
    }
}

console.log("module.exports = "+JSON.stringify(markers));
