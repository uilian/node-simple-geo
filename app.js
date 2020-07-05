var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const logger = require('./config/logger');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined', {stream: logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 
 
const index = require('./routes/index');
const apiV1 = require('./routes/v1/routes.js');

app.use('/', index);
app.use('/api', apiV1);
 
var server = app.listen(3000, function () {
   logger.info(`Listening on port ${server.address().port} ...`);
});
