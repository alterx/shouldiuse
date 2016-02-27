"use strict";
var CONFIG = require('../config');
// TODO: Add an interface to register more template locals.
function templateLocals() {
    return CONFIG;
}
exports.templateLocals = templateLocals;
