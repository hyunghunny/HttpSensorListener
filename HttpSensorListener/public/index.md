# Sensor Chart Programming Guide

![license-image]

TODO::Short introduction

## How to visualize your observations in sensor chart
* Register yourself at (http://sensorchart.com)
* Register your sensor and get appropriate something (sensorId, auth key - TODO: update it later)
* Programming your sensor to upload observation in two ways
  * with JavaScript API (on browser or Node.js)
  * with RESTful API (on any platforms)
* Checking your data posted properly at (http://sensorchart.com)
* See your charts and find your own insight.

## Programming with JavaScript API
you can download javascript API here (http://147.47.123.49:3000/api.js) or link it as below:
### sending data on client (any browser) 
```html
<html>
    <header>
        <script src="http://147.47.123.49:3000/api.js"></script>
        <script>
        transmitter = new RESTTransmitter('http://147.47.123.49:3000');
        // your code here
        </script>
    </header>
<html>
```
### sending data on server (node.js)
```javascript
transmitter = require('http://147.47.123.49:3000/api.js').transmitter;
// your code here
```

TODO::describe the steps to send data
### Sample code
```javascript
transmitter.login(id, password, function (sender) {
    if (sender) {
        sender.emit(sensorId, observations, function (result) {
            console.log('is it transmitted: ' + result);
        });
    } else {
        console.log('login error!');
    }
});
```

## Programming with RESTful API
TODO:describe here
To details, kindly refer to the [apidoc](apidoc/index.html)

----
Copyright (c) 2015 SensorChart.com


[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat