var gulp = require('gulp');
var ngGulp = require('ng-gulp');
var path = require('path');

function exclude(path) {
    return '!' + path;
}

ngGulp(gulp, {
    cssBasename: 'peoplesearch.ng',
    devServerPort: 4000,
    directories: {
        outputVendor: path.resolve(__dirname, 'dist')
    },
    externals: {
        'angular-translate': 'window["angular-translate"]',
        'angular-ui-router': 'window["angular-ui-router"]',
        'ng-ias': 'window["ng-ias"]'
    },
    files: {
        typescriptMainDevelopment: path.resolve(__dirname, 'src/main.dev.ts'),
        typescriptMainTest: path.resolve(__dirname, 'src/peoplesearch/orgchart.component.test.ts'), //fix
        vendorDevelopment: [
            path.resolve(__dirname, 'node_modules/angular/angular.js'),
            path.resolve(__dirname, 'vendor/angular-ui-router.js'),
            // path.resolve(__dirname, 'node_modules/angular-ui-router/release/angular-ui-router.js'),
            path.resolve(__dirname, 'node_modules/angular-translate/dist/angular-translate.js'),
            path.resolve(__dirname, 'node_modules/ias-icons/dist/**/*'),
            path.resolve(__dirname, 'node_modules/ng-ias/dist/ng-ias.css'),
            path.resolve(__dirname, 'node_modules/ng-ias/dist/ng-ias.js'),
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