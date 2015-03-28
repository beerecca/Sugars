
import * as api from 'api/handler';



export function run(appdir) {
    //start the server
    var express = require('express');
    var app = express();
    app.dir = appdir;

    app.use(express.static(app.dir));
    app.set('port', (process.env.PORT || 5000));

    app.get('/', function(request, response) {
        response.sendFile(app.dir + '/index.html');
    });

    app.get('/api', function(request, response) {
        console.log(api.hello());
        console.log(request);
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

}


