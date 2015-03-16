require('require-dir')('build/tasks');

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('serveprod-jpsm', function() {
    shell.task('npm install jspm');
    shell.task('node node_modules/jspm/cli.js install -y');
});

gulp.task('serveprod', ['build', 'serveprod-jpsm'], function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname));
    app.set('port', (process.env.PORT || 5000));
    
    app.get('/', function(request, response) {
        response.sendFile(__dirname + '/index.html');

    });

    app.listen(app.get('port'), function() {
        console.log('Up and running on all cylinders');
        console.log(' _________');
        console.log('< moooooo >');
        console.log(' ---------');
        console.log('        \\   ^__^');
        console.log('         \\  (oo)\\_______');
        console.log('            (__)\\       )\\/\\');
        console.log('                ||----w |');
        console.log('                ||     ||');
    });

});
