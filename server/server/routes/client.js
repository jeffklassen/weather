var express = require('express');
var router = express.Router();
var config = require('../config/config');




//route of the 
router.get('/app/', function (req, res, next) {
    res.sendFile('/client/index.html', config);
});
router.get('/client/*', function (req, res, next) {
    res.sendFile(req.path, config);
});


module.exports = router;