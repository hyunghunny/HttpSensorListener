
var credential = require('./credential.js');


var APIManager = function (type, userId) {
    if (!type) {
        this.contentType = 'application/json';
    } else {        
        this.contentType = type;
    }
    this.userId = userId;
}

APIManager.prototype.getContentHeader = function () {
    return { "Content-Type": this.contentType };
}

APIManager.prototype.getBillboard = function () {
    if (this.contentType == 'application/json') {
        var userId = this.userId;
        var apiList = [];
        var userSensors = credential.auth[userId].sensors;
        for (var i = 0; i < userSensors.length; i++) {
            var postApi = {
                "type": "POST",
                "href" : '/' + userId + '/' + userSensors[i]
            };
            apiList.push(postApi);
        }

        var apiObj = {
            "api": apiList
        }
        return apiObj;
    }
    // TODO: add more content type here.
}

exports.getAPI = function (type, userId) {
    return new APIManager(type, userId);
}

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
            
            return true;
        } else {
            // TODO:handle other format (such as csv)
            return false;
        }
    }
};

exports.validator = validator;

exports.translate = function (type, content) {
    if (type == 'application/json') {
        return content;
    } else if (type == 'text/csv') {
        return csvTojs(content);
    } else {
        console.log('invalid content type: ' + content);
        return [];
    }
    
}

// excepted from https://gist.github.com/jonmaim/7b896cf5c8cfe932a3dd

function csvTojs(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        
        var row = lines[i],
            queryIdx = 0,
            startValueIdx = 0,
            idx = 0;
        
        if (row.trim() === '') { continue; }
        
        while (idx < row.length) {
            /* if we meet a double quote we skip until the next one */
            var c = row[idx];
            
            if (c === '"') {
                do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
            }
            
            if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
                /* we've got a value */
                var value = row.substr(startValueIdx, idx - startValueIdx).trim();
                
                /* skip first double quote */
                if (value[0] === '"') { value = value.substr(1); }
                /* skip last comma */
                if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
                /* skip last double quote */
                if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }
                
                var key = headers[queryIdx++];
                obj[key] = value;
                startValueIdx = idx + 1;
            }
            
            ++idx;
        }
        
        result.push(obj);
    }
    return result;
}