"use strict";
var utils_1 = require('../utils');
module.exports = function serverStart(gulp, plugins) {
    return function () {
        utils_1.serveCoverage();
    };
};
