/// <reference path="../manual_typings/slash.d.ts" />
"use strict";
var slash = require('slash');
var path_1 = require('path');
var config_1 = require('../config');
var injectables = [];
function injectableAssetsRef() {
    return injectables;
}
exports.injectableAssetsRef = injectableAssetsRef;
function registerInjectableAssetsRef(paths, target) {
    if (target === void 0) { target = ''; }
    injectables = injectables.concat(paths
        .filter(function (path) { return !/(\.map)$/.test(path); })
        .map(function (path) { return path_1.join(target, slash(path).split('/').pop()); }));
}
exports.registerInjectableAssetsRef = registerInjectableAssetsRef;
function transformPath(plugins, env) {
    return function (filepath) {
        filepath = config_1.ENV === 'prod' ? filepath.replace("/" + config_1.APP_DEST, '') : filepath;
        arguments[0] = path_1.join(config_1.APP_BASE, filepath) + ("?" + Date.now());
        return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
}
exports.transformPath = transformPath;
