var elasticsearch = require('elasticsearch');
var crypto = require('crypto');
var config = require('../../../config');


function getClient() {

    // Connect the client to two nodes, requests will be
    // load-balanced between them using round-robin
    return client = elasticsearch.Client({
        hosts: config.esHosts
    });
};

var getLocations = function (callback) {
    var client = getClient();
    client.search({
        index: 'weather',
        size: 60,
        type: 'current_observation',
        body: {
            aggs: {
                display_location: {
                    nested: {
                        path: "display_location"
                    },
                    aggs: {
                        city: {
                            terms: {
                                field: "display_location.city"
                            }
                        }
                    }
                }
            }
        }
    }).then(function (resp) {
        console.log(resp.aggregations.display_location.city);
        if (resp.hits.hits) {
            if (callback) {
                callback(resp.aggregations.display_location.city);
            }
        }
        client.close();
    });
};


var getMostRecent = function (city, count, callback) {
    var client = getClient();
    client.search({
        index: 'weather',
        size: count,
        type: 'current_observation',
        body: {
            filter: {
                nested: {
                    path: "display_location",
                    filter: {
                        bool: {
                            must: {
                                term: {
                                    "display_location.city": city
                                }
                            }
                        }
                    }
                }
            },

            sort: {
                observation_epoch: {
                    order: "desc"
                }
            }
        },

    }).then(function (resp) {
        // console.log(resp);
        if (resp.hits.hits) {
            if (callback) {
                callback(resp.hits.hits);
            }
        }
        client.close();
    });
};

/*getMostRecent("Ellicott City", function (hits) {

    hits.forEach(function (hit) {
        console.log(hit._source.observation_time_rfc822, hit._source.observation_epoch, hit._source.display_location.city);
    });


});*/

module.exports.getLocations = getLocations;
module.exports.getMostRecent = getMostRecent;