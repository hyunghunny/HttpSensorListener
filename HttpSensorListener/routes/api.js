var express = require('express');
var router = express.Router();

var controller = require('../control.js');
var db = require('../mysql_control.js');

/* GET API doc */
router.get('/', function (req, res) {
    res.redirect('/apidoc/index.html');
});

/**
 * @api {get} :userId Show available APIs
 * @apiName Listing_API
 * @apiGroup Billboard
 * @apiExample {js} Example usage:
 *     GET /john
 *     Authentication: John'sAuthKey
 *       
 * @apiHeader {String} Authorization your authentication key
 * @apiHeader {String} Content-Type application/json
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {"api":[{
 *      "href":"/api/john/1421",
 *      "type":"POST",
 *      
 *  }]}
 *
 *
 * @apiDescription This API lists the top level APIs.
 * You can navigate the other APIs by starting with this API.
 *
 */
router.get('/:userId', function (req, res) {
    try {
        var userId = req.params.userId;
        var authKey = req.headers['authorization'];
        var contentType = req.headers['content-type'];
        if (!controller.validator.authenticate(userId, authKey)) {
            throw new Error('401');
        }
        var apiObj = controller.getAPI(contentType, userId);

        res.writeHead(200, apiObj.getContentHeader());
        res.end(JSON.stringify(apiObj.getBillboard()));
    } catch (err) {
        res.sendStatus(err.message);
    }

});


/**
 * @api {post} userId/:sensorId Posting sensor dataset
 * @apiName Posting_API
 * @apiGroup Posting Observations
 * @apiExample {js} Example usage:
 *     POST /john/1421 
 *     Authorization: John'sAuthKey
 *     
 *     { "observations" : [
 *       {
 *         "timestamp": 1428591600000,
 *         "value": 10
 *         }
 *     ]}
 * @apiHeader {String} Authorization your authentication key     
 * @apiHeader {String} Content-Type application/json or text/csv
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 202 Accepted
 *
 *
 */
router.post('/:userId/:sensorId', function (req, res) {
    try {
        var userId = req.params.userId;
        var sensorId = req.params.sensorId;
        var authKey = req.headers['authorization'];

        if (!controller.validator.authenticate(userId, authKey)) {
            throw new Error('401');
        }
        
        if (!controller.validator.isAuthorized(userId, sensorId)) {
            throw new Error('401');
        }
        
        var contentType = req.headers['content-type'];
        if (!controller.validator.isValid(contentType, req.body)) {
            throw new Error('400');
        }
        
        
        db.connect(function (result) {
            if (result) {
                var observations = controller.translate(contentType, req.body.observations);
                
                for (var i = 0; i < observations.length; i++) {
                    var observation = observations[i];
                    var timestamp = observation.timestamp;
                    var value = observation.value;
                    if (!timestamp || !value) throw new Error('400');

                    var insertAsync = function (timestamp, sensorId, value) {
                        db.insert(timestamp, sensorId, value, function (result) {
                            if (result == false) {
                                console.log('failed to insert data');
                            } else {
                                console.log('success to insert data');
                            }
                        });
                    }(timestamp, sensorId, value);

                }
                res.sendStatus('202');
            } else {
                res.sendStatus('500');
            }
        });
  
    } catch (err) {
        res.sendStatus(err.message);
    }
});

module.exports = router;