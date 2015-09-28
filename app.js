var express = require('express');
var app = express();

app.use(express.static('.'));
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Up and running on all cylinders');
});

