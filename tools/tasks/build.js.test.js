"use strict";
var path_1 = require('path');
var config_1 = require('../config');
var utils_1 = require('../utils');
module.exports = function buildJSTest(gulp, plugins) {
    return function () {
        var tsProject = utils_1.tsProjectFn(plugins);
        var src = [
            'typings/browser.d.ts',
            path_1.join(config_1.APP_SRC, '**/*.ts'),
            '!' + path_1.join(config_1.APP_SRC, '**/*.e2e.ts'),
            '!' + path_1.join(config_1.APP_SRC, config_1.BOOTSTRAP_MODULE + ".ts")
        ];
        var result = gulp.src(src)
            .pipe(plugins.plumber())
            .pipe(plugins.inlineNg2Template({ base: config_1.APP_SRC, useRelativePaths: true }))
            .pipe(plugins.typescript(tsProject));
        return result.js
            .pipe(gulp.dest(config_1.APP_DEST));
    };
};
