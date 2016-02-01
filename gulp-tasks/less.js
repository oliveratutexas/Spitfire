var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

gulp.task('less', function () {
    gulp.src('src/less/main.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
