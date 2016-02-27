"use strict";
var fs_1 = require('fs');
var yargs_1 = require('yargs');
var path_1 = require('path');
var chalk = require('chalk');
// --------------
// Configuration.
var ENVIRONMENTS = {
    DEVELOPMENT: 'dev',
    PRODUCTION: 'prod'
};
exports.PORT = yargs_1.argv['port'] || 5555;
exports.PROJECT_ROOT = path_1.normalize(path_1.join(__dirname, '..'));
exports.ENV = getEnvironment();
exports.DEBUG = yargs_1.argv['debug'] || false;
exports.DOCS_PORT = yargs_1.argv['docs-port'] || 4003;
exports.COVERAGE_PORT = yargs_1.argv['coverage-port'] || 4004;
exports.APP_BASE = yargs_1.argv['base'] || '/';
exports.ENABLE_HOT_LOADING = !!yargs_1.argv['hot-loader'];
exports.HOT_LOADER_PORT = 5578;
exports.BOOTSTRAP_MODULE = exports.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';
exports.APP_TITLE = 'Angular 2 Seed';
exports.APP_SRC = 'src';
exports.ASSETS_SRC = exports.APP_SRC + "/assets";
exports.TOOLS_DIR = 'tools';
exports.DOCS_DEST = 'docs';
exports.DIST_DIR = 'dist';
exports.DEV_DEST = exports.DIST_DIR + "/dev";
exports.PROD_DEST = exports.DIST_DIR + "/prod";
exports.TMP_DIR = exports.DIST_DIR + "/tmp";
exports.APP_DEST = exports.DIST_DIR + "/" + exports.ENV;
exports.CSS_DEST = exports.APP_DEST + "/css";
exports.JS_DEST = exports.APP_DEST + "/js";
exports.APP_ROOT = exports.ENV === 'dev' ? "" + exports.APP_BASE + exports.APP_DEST + "/" : "" + exports.APP_BASE;
exports.VERSION = appVersion();
exports.CSS_PROD_BUNDLE = 'all.css';
exports.JS_PROD_SHIMS_BUNDLE = 'shims.js';
exports.JS_PROD_APP_BUNDLE = 'app.js';
exports.VERSION_NPM = '2.14.2';
exports.VERSION_NODE = '4.0.0';
exports.NG2LINT_RULES = customRules();
if (exports.ENABLE_HOT_LOADING) {
    console.log(chalk.bgRed.white.bold('The hot loader is temporary disabled.'));
    process.exit(0);
}
// Declare NPM dependencies (Note that globs should not be injected).
exports.DEV_NPM_DEPENDENCIES = normalizeDependencies([
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'es6-shim/es6-shim.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: exports.JS_DEST },
    { src: 'rxjs/bundles/Rx.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'angular2/bundles/angular2.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'angular2/bundles/router.js', inject: 'libs', dest: exports.JS_DEST },
    { src: 'angular2/bundles/http.js', inject: 'libs', dest: exports.JS_DEST }
]);
exports.PROD_NPM_DEPENDENCIES = normalizeDependencies([
    { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
    { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
    { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
    { src: 'systemjs/dist/system.js', inject: 'shims' },
    { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' }
]);
// Declare local files that needs to be injected
exports.APP_ASSETS = [
    { src: exports.ASSETS_SRC + "/main.css", inject: true, dest: exports.CSS_DEST },
    { src: exports.ASSETS_SRC + "/grid.css", inject: true, dest: exports.CSS_DEST }
];
exports.DEV_DEPENDENCIES = exports.DEV_NPM_DEPENDENCIES.concat(exports.APP_ASSETS);
exports.PROD_DEPENDENCIES = exports.PROD_NPM_DEPENDENCIES.concat(exports.APP_ASSETS);
// ----------------
// SystemsJS Configuration.
var SYSTEM_CONFIG_DEV = {
    defaultJSExtensions: true,
    paths: (_a = {},
        _a[exports.BOOTSTRAP_MODULE] = "" + exports.APP_BASE + exports.BOOTSTRAP_MODULE,
        _a['angular2/*'] = exports.APP_BASE + "angular2/*",
        _a['rxjs/*'] = exports.APP_BASE + "rxjs/*",
        _a['*'] = exports.APP_BASE + "node_modules/*",
        _a
    ),
    packages: {
        angular2: { defaultExtension: false },
        rxjs: { defaultExtension: false }
    }
};
exports.SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;
exports.SYSTEM_BUILDER_CONFIG = {
    defaultJSExtensions: true,
    paths: (_b = {},
        _b[exports.TMP_DIR + "/*"] = exports.TMP_DIR + "/*",
        _b['*'] = 'node_modules/*',
        _b
    )
};
// --------------
// Private.
function normalizeDependencies(deps) {
    deps
        .filter(function (d) { return !/\*/.test(d.src); }) // Skip globs
        .forEach(function (d) { return d.src = require.resolve(d.src); });
    return deps;
}
function appVersion() {
    var pkg = JSON.parse(fs_1.readFileSync('package.json').toString());
    return pkg.version;
}
function customRules() {
    var lintConf = JSON.parse(fs_1.readFileSync('tslint.json').toString());
    return lintConf.rulesDirectory;
}
function getEnvironment() {
    var base = yargs_1.argv['_'];
    var prodKeyword = !!base.filter(function (o) { return o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0; }).pop();
    if (base && prodKeyword || yargs_1.argv['env'] === ENVIRONMENTS.PRODUCTION) {
        return ENVIRONMENTS.PRODUCTION;
    }
    else {
        return ENVIRONMENTS.DEVELOPMENT;
    }
}
var _a, _b;
