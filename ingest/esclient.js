var elasticsearch = require('elasticsearch');
var crypto = require('crypto');
var config = require('../config');

function getClient() {

    // Connect the client to two nodes, requests will be
    // load-balanced between them using round-robin
    return client = elasticsearch.Client({
        hosts: config.esHosts
    });
};


var indexCurrentObservation = function (weather) {
    var client = getClient();
    var toindex = {
        index: 'weather',
        type: 'current_observation',
        body: weather,
        id: weather.display_location.full + " " + weather.observation_epoch
    };
    client.index(toindex,
        function (err, resp) {
            if (err) {
                console.warn("ERROR");
                console.warn(err);

            }
            //console.log("RESPONSE", resp);
            client.close();
        }

    );

};

module.exports.indexCurrentObservation = indexCurrentObservation;