var client = require('../data/esclient');

var getMostRecent = function (req, res, city, count) {
    client.getMostRecent(city, count,
        function (hits) {
            console.log(hits);
            if (hits && hits.length == 1) {
                res.send(hits[0]._source);
            } else {
                var observations = [];
                hits.forEach(function (hit) {
                    observations.push(hit._source);
                });
                res.send(observations);
            }
        });
};

module.exports = getMostRecent;