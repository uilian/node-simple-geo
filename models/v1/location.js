var mongoose = require('mongoose');
var db = require('../../config/database');

var locationSchema = new mongoose.Schema({
   nome: String,
   endereco: String,
   local: {
      type: [Number],   // [ <longitude> , <latitude> ]
      index: '2d'       // geospatial index
   },
   setor: String
}, 
{ collection : 'wifi_hotspots' }
);

const location = mongoose.model('location', locationSchema);

module.exports = {
   filterByGeolocation: (filters, callback) => {
      location.find({
         local: {
            $near: filters.coords,
            $maxDistance: filters.maxDistance
         }
      }).limit(filters.limit).exec((err, result) => {
         if (err) {
            throw err;
         }
         return callback(null, result);
      });
   },
   create: (inputData, callback) => {
      const wifiData = new location(inputData);
      wifiData.save((err, data) => {
         if (err) 
            throw err;
         return callback(data);
      });
   },
   loadList: (list, callback) => {
      location.collection.insertMany(list, (err, res) => {
         if (err)
            throw err;
         db.close();            
         return callback(null, res);
      });
   }
};
