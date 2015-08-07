var db = require('./mysql_control.js');
var credential = require('./credential.js');

var api = {
    getContentHeader : function () {
        return 'application/json';
    },
    getBillboard : function () {
        var billboard = {
            // TODO: set billboard here
        }
        return billboard;
    }
};

exports.api = api;

var validator = {
    authenticate : function (userId, authKey) {
        // TODO:add more useful validation mechanism
        var userCredit = credential.auth[userId];
        if (!userCredit) return false;

        return (userCredit.key === authKey);
    },
    isAuthorized : function (userId, sensorId) {
        var userCredit = credential.auth[userId];
        if (!userCredit) return false;

        var userSensorList = userCredit.sensors;
        for (userSensorId in userSensorList) {
            if (userSensorId === sensorId) return true;
        }
        return false;
    },
    isValid : function (type, body) {
        if (type === 'application/json') {
            var jsonBody = body;
            // TODO: checking array is also object
            if (typeof jsonBody !== 'object') return false;
            // TODO:validate json format here 
            return false;
        } else {
            // TODO:handle other format (such as csv)
            return false;
        }
    }
};
