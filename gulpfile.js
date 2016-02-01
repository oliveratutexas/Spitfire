var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/index.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 
var bundle = function() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('main.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
           // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist/js'));
};

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
gulp.task('js', bundle);

gulp.task('less', function () {
    gulp.src('src/less/main.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    // JS watching done via watchify, which allows for incremental builds
    gulp.watch('src/less/*', ['less']);
});

gulp.task('default', ['less', 'js', 'watch']);
