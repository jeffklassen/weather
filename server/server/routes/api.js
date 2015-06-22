var express = require('express');
var router = express.Router();
var locationList = require('../models/locationList');
var mostRecent = require('../models/mostRecent');

router.get('/locations', function (req, res, next) {
    locationList(req, res);
});

router.get('/mostRecent/:location/:count', function (req, res, next) {
    var location = req.params.location;
    var count = req.params.count;
    mostRecent(req, res, location, count);
});


module.exports = router;