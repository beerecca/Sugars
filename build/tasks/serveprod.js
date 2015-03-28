var gulp = require('gulp');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('jspmdependencies', shell.task('jspm install'));

gulp.task('startserver', shell.task('node app.js'))

gulp.task('serveprod', function(callback) {
    return runSequence(
        'build',
        'jspmdependencies',
        'startserver',
        callback
    );
});
