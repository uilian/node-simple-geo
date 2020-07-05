const logger = require('./logger');

var location = require('../models/v1/location.js');
var document = require('../data/wifi.json');


location.loadList(document, (err, res) => {
   if (err)
      throw err;
   logger.info(`Load finished, inserted ${res.insertedCount} records.`);
});
