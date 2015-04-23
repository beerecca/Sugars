var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var shell = require('gulp-shell');
var plumber = require('gulp-plumber');
var to5 = require('gulp-6to5');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../6to5-options');
var assign = Object.assign || require('object.assign');
var jspm = require('jspm');

gulp.task('build-app', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/' + paths.root }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-system', ['build-app'], function() {
  paths.bundles.map(function(bundle) {
    jspm.bundle(paths.output + bundle.module, paths.output + bundle.name + '.js', { inject : true, minify: true });
  });
});

gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-html', 'build-system'],
    callback
  );
});
