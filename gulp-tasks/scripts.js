var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var brfs = require('brfs');

var isDeploy = function() {
    // node, gulp, compile, --debug
    if (process.argv.length < 4) {
        return;
    }
    return process.argv[2] === 'compile' && process.argv[3] === '--deploy';
};

// app
var appCustomOpts = {
    entries: ['./src/app/main.js'],
    debug: !isDeploy()
};

var appOpts = assign({}, watchify.args, appCustomOpts);
var appBrowserify = watchify(browserify(appOpts));

var appBundle = function() {
    return appBrowserify.transform('brfs')
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error app'))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: !isDeploy()}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/app'));
};

appBrowserify.on('update', appBundle);
appBrowserify.on('log', gutil.log);
gulp.task('app', appBundle);

//  js
var jsCustomOpts = {
    entries: ['./src/js/main.js'],
    debug: !isDeploy()
};

var jsOpts = assign({}, watchify.args, jsCustomOpts);
var jsBrowserify = watchify(browserify(jsOpts));

var jsBundle = function() {
    return jsBrowserify.transform('brfs')
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error js'))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: !isDeploy()}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
};

jsBrowserify.on('update', jsBundle);
jsBrowserify.on('log', gutil.log);
gulp.task('js', jsBundle);
