var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationModel = function() {
   var LocationSchema = new Schema({
      nome: String,
      endereco: String,
      local: {
         type: [Number],   // [ <longitude> , <latitude> ]
         index: '2d'       // geospatial index
      },
      setor: String
   }, 
   { collection : 'wifi' });
   mongoose.model('Location', LocationSchema);
};

module.exports = LocationModel;