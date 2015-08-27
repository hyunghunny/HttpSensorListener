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

exports.inquire = function (sql, callback) {
    // TODO: make a query here
}

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