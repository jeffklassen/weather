var http = require('http');
var esclient = require('./esclient');
var config = require('../config');

var maxRequests = 470;
var minutesInADay = 1440;
var millisecondsInAMinute = 60000;

var locations = config.locations;

var requestInterval = (minutesInADay / (maxRequests / locations.length)) * millisecondsInAMinute;
//requestInterval = parseInt(requestInterval);

requestInterval = 2000;

console.log("Request Interval: ", requestInterval);

callback = function (response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        var json = JSON.parse(str);

        var observationTime = json.current_observation.observation_epoch;
        var observationLocation = json.current_observation.display_location.full

        console.log(observationTime, observationLocation);

        if (observationTime && observationLocation) {
            esclient.indexCurrentObservation(json.current_observation);
        }

    });
}
setInterval(function () {
    locations.forEach(function (location) {

        http.request({
            host: 'api.wunderground.com',
            path: '/api/' + config.apiKey + '/conditions/q/' + location + '.json'
        }, callback).end();

    });
    console.log("called at: " + Date.now());
}, requestInterval);