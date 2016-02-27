"use strict";
var path_1 = require('path');
var config_1 = require('../config');
module.exports = function buildDocs(gulp, plugins, option) {
    return function () {
        var src = [
            'typings/main.d.ts',
            path_1.join(config_1.APP_SRC, '**/*.ts'),
            '!' + path_1.join(config_1.APP_SRC, '**/*.spec.ts'),
            '!' + path_1.join(config_1.APP_SRC, '**/*.e2e.ts')
        ];
        return gulp.src(src)
            .pipe(plugins.typedoc({
            // TypeScript options (see typescript docs)
            module: 'commonjs',
            target: 'es5',
            includeDeclarations: true,
            // Output options (see typedoc docs)
            out: config_1.DOCS_DEST,
            json: path_1.join(config_1.DOCS_DEST, 'data/docs.json'),
            name: config_1.APP_TITLE,
            ignoreCompilerErrors: false,
            experimentalDecorators: true,
            version: true
        }));
    };
};
