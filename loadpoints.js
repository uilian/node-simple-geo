var MongoClient = require('mongodb').MongoClient;
var document = require('./data/wifi.json');
var url = 'mongodb://localhost:27017/sampledb';

MongoClient.connect(url, function(err, db) {
   if (err) return console.dir(err)
   var collection = db.collection('wifi');
   collection.ensureIndex({local: "2d"}, {min: -180, max: 180, w:1}, function(err, result) {
   if (err) return console.dir(err);
      collection.insert(document, {w:1}, function(err, result) {
         if(err) return console.dir(err)
      });
   });
   console.log("Load finished!"); 
});
