var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 
 
const index = require('./routes/index');
const apiV1 = require('./routes/v1/routes.js');

app.use('/', index);
app.use('/api', apiV1);
 
var server = app.listen(3000, function () {
   console.log('Listening on port %s...', server.address().port);
});
