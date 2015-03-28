var gulp = require('gulp');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('jspmgithub', shell.task('jspm config endpoints.github.auth ' + process.env.JSPM_GITHUB_AUTH));

gulp.task('jspmdependencies', shell.task('jspm install'));

gulp.task('startserver', shell.task('node app.js'))

gulp.task('serveprod', function(callback) {
    return runSequence(
        'build',
        'jspmgithub',
        'jspmdependencies',
        'startserver',
        callback
    );
});
