var express = require('express');
var router = express.Router();
var controller = require('../control.js');

/* GET /api */
router.get('/', function (req, res) {
    if (req.headers['content-type'] == 'application/json') {
        res.writeHead(200, controller.api.getContentHeader());
        res.end(controller.api.getBillboard());
    } else {
        res.redirect('/api.html');
    }

});

// TODO:how to passing header param?
router.post('/:sensorId', function (req, res) {
    
});