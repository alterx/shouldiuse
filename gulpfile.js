"use strict";
var gulp = require('gulp');
var utils_1 = require('./tools/utils');
// --------------
// Clean (override).
gulp.task('clean', function (done) { return utils_1.task('clean', 'all')(done); });
gulp.task('clean.dev', function (done) { return utils_1.task('clean', 'dev')(done); });
gulp.task('clean.prod', function (done) { return utils_1.task('clean', 'prod')(done); });
gulp.task('check.versions', function () { return utils_1.task('check.versions'); });
gulp.task('build.docs', function () { return utils_1.task('build.docs'); });
gulp.task('serve.docs', function () { return utils_1.task('serve.docs'); });
gulp.task('serve.coverage', utils_1.task('serve.coverage'));
// --------------
// Build dev.
gulp.task('build.dev', function (done) {
    return utils_1.runSequence('clean.dev', 'tslint', 'build.assets.dev', 'build.js.dev', 'build.index.dev', done);
});
// --------------
// Build dev watch.
gulp.task('build.dev.watch', function (done) {
    return utils_1.runSequence('build.dev', 'watch.dev', done);
});
// --------------
// Build e2e.
gulp.task('build.e2e', function (done) {
    return utils_1.runSequence('clean.dev', 'tslint', 'build.assets.dev', 'build.js.e2e', 'build.index.dev', done);
});
// --------------
// Build prod.
gulp.task('build.prod', function (done) {
    return utils_1.runSequence('clean.prod', 'tslint', 'build.assets.prod', 'build.html_css.prod', 'build.js.prod', 'build.bundles', 'build.bundles.app', 'build.index.prod', done);
});
// --------------
// Build test.
gulp.task('build.test', function (done) {
    return utils_1.runSequence('clean.dev', 'tslint', 'build.assets.dev', 'build.js.test', 'build.index.dev', done);
});
// --------------
// Build test watch.
gulp.task('build.test.watch', function (done) {
    return utils_1.runSequence('build.test', 'watch.test', done);
});
// --------------
// Docs
// Disabled until https://github.com/sebastian-lenz/typedoc/issues/162 gets resolved
gulp.task('docs', function (done) {
    return utils_1.runSequence('build.docs', 'serve.docs', done);
});
// --------------
// Serve dev
gulp.task('serve.dev', function (done) {
    return utils_1.runSequence('build.dev', 'server.start', 'watch.serve', done);
});
// --------------
// Serve e2e
gulp.task('serve.e2e', function (done) {
    return utils_1.runSequence('build.e2e', 'server.start', 'watch.serve', done);
});
// --------------
// Serve prod
gulp.task('serve.prod', function (done) {
    return utils_1.runSequence('build.prod', 'server.start', 'watch.serve', done);
});
// --------------
// Test.
gulp.task('test', function (done) {
    return utils_1.runSequence('build.test', 'karma.start', done);
});
