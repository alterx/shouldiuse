"use strict";
var path_1 = require('path');
var config_1 = require('../config');
module.exports = function buildAssetsDev(gulp, plugins) {
    // TODO There should be more elegant to prevent empty directories from copying
    var es = require('event-stream');
    var onlyDirs = function (es) {
        return es.map(function (file, cb) {
            if (file.stat.isFile()) {
                return cb(null, file);
            }
            else {
                return cb();
            }
        });
    };
    return function () {
        return gulp.src([
            path_1.join(config_1.APP_SRC, '**'),
            '!' + path_1.join(config_1.APP_SRC, '**', '*.ts'),
            '!' + path_1.join(config_1.APP_SRC, '**', '*.css'),
            '!' + path_1.join(config_1.APP_SRC, '**', '*.html'),
        ])
            .pipe(onlyDirs(es))
            .pipe(gulp.dest(config_1.APP_DEST));
    };
};
