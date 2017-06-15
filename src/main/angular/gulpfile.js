// TODO: setup tests
// TODO: update ng-gulp to have imagesProduction and imagesDevelopment
// TODO: remove unnecessary intermediate step that copies code to pwm\target\angular, builds it, then copies output
// TODO: add ias-icons and ng-ias assets formally to this build (via package.json or vendor folder)

var gulp = require('gulp');
var ngGulp = require('ng-gulp');
var path = require('path');

// Output to where assets are served in production
var outputDirectory = '../webapp/public/resources/app';

// Images only for development, so check whether this is a production build
var args = process.argv.slice(2);
var PRODUCTION = false;
args.forEach(function(arg) {
    if (/production/.test(arg)) {
        PRODUCTION = true;
    }
});
var imagesPath = PRODUCTION ? [] : 'images/**/*.{png,gif,jpg,svg}';

function exclude(path) {
    return '!' + path;
}

ngGulp(gulp, {
    cssBasename: 'peoplesearch.ng',
    devServerPort: 4000,
    directories: {
        output: path.resolve(__dirname, outputDirectory, '.'),
        outputImages: path.resolve(__dirname, outputDirectory, './images'),
        outputVendor: path.resolve(__dirname, outputDirectory, '.')
    },
    externals: {
        'angular-translate': 'window["angular-translate"]',
        'angular-ui-router': 'window["angular-ui-router"]',
        'ng-ias': 'window["ng-ias"]'
    },
    files: {
        images: path.resolve(__dirname, imagesPath),
        typescriptMainDevelopment: path.resolve(__dirname, 'src/main.dev.ts'),
        typescriptMainTest: path.resolve(__dirname, 'src/peoplesearch/orgchart.component.test.ts'),
        vendorDevelopment: [
            path.resolve(__dirname, 'node_modules/angular/angular.js'),
            path.resolve(__dirname, 'node_modules/angular-ui-router/release/angular-ui-router.js'),
            path.resolve(__dirname, 'node_modules/angular-translate/dist/angular-translate.js'),
            path.resolve(__dirname, 'node_modules/ng-ias/dist/ng-ias.css'),
            path.resolve(__dirname, 'node_modules/ng-ias/dist/ng-ias.js'),
            path.resolve(__dirname, 'node_modules/ias-icons/dist/**/*'),
            exclude(path.resolve(__dirname, 'node_modules/ias-icons/dist/ias-icons.min.css')),
            exclude(path.resolve(__dirname, 'node_modules/ias-icons/dist/ias-icons.html'))
        ],
        vendorProduction: [
            path.resolve(__dirname, 'node_modules/ng-ias/dist/ng-ias.css'),
            path.resolve(__dirname, 'node_modules/ng-ias/dist/ng-ias.js'),
            path.resolve(__dirname, 'node_modules/ias-icons/dist/**/*'),
            exclude(path.resolve(__dirname, 'node_modules/ias-icons/dist/ias-icons.min.css')),
            exclude(path.resolve(__dirname, 'node_modules/ias-icons/dist/ias-icons.html'))
        ],
        vendorTest: [
            path.resolve(__dirname, 'node_modules/angular/angular.js'),
            path.resolve(__dirname, 'node_modules/angular-mocks/angular-mocks.js'),
            path.resolve(__dirname, 'node_modules/angular-translate/dist/angular-translate.js'),
            path.resolve(__dirname, 'node_modules/ias-icons/dist/**/*'),
            exclude(path.resolve(__dirname, 'node_modules/ias-icons/dist/ias-icons.min.css')),
            exclude(path.resolve(__dirname, 'node_modules/ias-icons/dist/ias-icons.html'))
        ]
    },
    jsBasename: 'peoplesearch.ng',
    productionServer: {
        root: [
            path.resolve(__dirname, '../dist'),
            path.resolve(__dirname, '../dist/docs')
        ]
    }
});
