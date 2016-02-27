"use strict";
var util = require('gulp-util');
var chalk = require('chalk');
var del = require('del');
var config_1 = require('../config');
function cleanAll(done) {
    del(config_1.DIST_DIR).then(function (paths) {
        util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
        done();
    });
}
function cleanDev(done) {
    del(config_1.DEV_DEST).then(function (paths) {
        util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
        done();
    });
}
function cleanProd(done) {
    del([config_1.PROD_DEST, config_1.TMP_DIR]).then(function (paths) {
        util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
        done();
    });
}
module.exports = function clean(gulp, plugins, option) {
    return function (done) {
        switch (option) {
            case 'all':
                cleanAll(done);
                break;
            case 'dev':
                cleanDev(done);
                break;
            case 'prod':
                cleanProd(done);
                break;
            default: done();
        }
    };
};
