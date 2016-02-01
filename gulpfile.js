var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp-tasks');

gulp.task('default', ['less', 'js', 'app', 'watch']);
gulp.task('compile', ['less', 'js', 'app']);
