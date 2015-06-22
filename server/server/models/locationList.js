var client = require('../data/esclient');

var getLocationsList = function (req, res) {
    client.getLocations(function (aggs) {
        console.log(aggs);
        var locations = [];
        aggs.buckets.forEach(function (bucket) {
            locations.push(bucket.key);
        });
        
        res.send(locations);
    });
};

module.exports = getLocationsList;