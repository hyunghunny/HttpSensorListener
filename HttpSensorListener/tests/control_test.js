var assert = require('assert');
var controller = require('../mysql_control.js');

exports['get sensors'] = function () {
    try {
        var user_uid = 2;
        controller.connect(function (isConnected) {
            if (!isConnected) {
                assert.ok(isConnected, 'connection failed');
            } else {
                controller.getSensors(user_uid, function (sensors) {
                    console.log(sensors);
                    assert.ok(true, sensors);
                    return;
                });
            }

        });

    } catch (ex) {
        assert.ok(false, ex);
    }    
}

