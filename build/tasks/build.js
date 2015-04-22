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

gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/' + paths.root }))
    .pipe(gulp.dest(paths.output));
});

//gulp.task('build-system', shell.task('jspm bundle aurelia-bootstrapper + core-js + aurelia-templating-binding + aurelia-templating-resources + aurelia-history-browser + aurelia-templating-router + aurelia-http-client + moment dist/build.js --inject --minify'));

/*gulp.task('build-system', function() {
  return jspm.bundleSFX('src/app', 'dist/build.js', { minify: true, inject: true});
});*/

gulp.task('build-bundles', function() {
  paths.bundles.map(function(bundle) {
    console.log('building bundle: ' + bundle.name);
    jspm.bundle(paths.output + bundle.module, paths.output + bundle.name + '.js', { inject : true });
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
    'build-bundles',
    callback
  );
});
