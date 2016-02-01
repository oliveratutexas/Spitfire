var gulp = require('gulp');

gulp.task('watch', function() {
    // app watching done via watchify, which allows for incremental builds
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/less/*', ['less']);
    gulp.watch('data/*', ['app']);
});
