var location = require('../models/v1/location.js');
var document = require('../data/wifi.json');

location.loadList(document, (err, res) => {
    if (err)
        throw err;
    console.log(`Load finished, inserted ${res.insertedCount} records.`);
});
