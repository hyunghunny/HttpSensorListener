var assert = require('assert');
var controller = require('../control.js');

exports['equality test'] = function () {
    var array = {};
    
    var equalityTest = (typeof array == 'object');
    assert.ok(equalityTest, typeof array);
}

exports['Test 2'] = function () {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(true, "This should fail");
}