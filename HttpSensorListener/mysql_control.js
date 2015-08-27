var mysql = require('mysql');
var credential = require('./credential.js');

var connection = mysql.createConnection(credential.db);
var isConnected = false;

exports.connect = function (cb) {
    if (isConnected) {
        cb(true);
    } else {
        connection.connect(function (err) {
            if (err) {
                console.error('mysql connection error');
                cb(false);
            } else {
                isConnected = true;
                cb(true);
            }
        });
    }

}

exports.insert = function (timestamp, sensorId, value, cb) {
    var dateString = formatDate(new Date(timestamp));
    //console.log(dateString.toString() + ":" + sensorId + ":" + value);
    connection.query('insert into st_mysensordata(regDate, st_mysensor_uid, value) values(?, ?, ?)',
        [dateString, parseInt(sensorId), value],
        function (err) {
        var result = true;

        if (err) {
            result = false;
            console.log(err.message);
        }

        if (cb) {
            cb(result);
        }
    });
}

exports.getSensors = function (userId, callback) {
    console.log("try to retrieve database...");
    try {
        var sql = "SELECT  `sensorid`,  `name`  FROM `starbucks`.`st_mysensor`";
        sql = sql + " WHERE `st_user_uid`=" + userId + ";"
        connection.query(sql,
            function (err, rows, cols) {
            if (err) throw err;
            var sensorList = [];

            for (var i = 0; i < rows.length; i++) {
                // TODO:set sensor info                            
                var sensorObj = {
                    "id" : rows[i].sensorId,
                    "name" : rows[i].name
                }
                sensorList.push[sensorObj];
            }
            
            callback(sensorList);

        });
    } catch (err) {
        console.log("DB query error : " + err.message);
        throw new Error('500');
    }
};

// return date to "yyyy-mm-dd HH:MM:ss"
function formatDate(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // month starts with 0
    var day = date.getDate();

    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var dateString = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    return dateString;
}