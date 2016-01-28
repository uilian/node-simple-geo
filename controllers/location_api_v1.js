var mongoose = require('mongoose');
var Location = mongoose.model('Location');

module.exports = {
   listSpots: function(req, res, next) {
      var limit = req.query.limit || 0;      
      // default 1 kilometer
      var maxDistance = req.query.distance || 1;

      /*
         Convert distance by 111.12 (one degree is approximately 111.12 kilometers).
         More about mongodb's geo-features : http://bit.ly/1PDr9z0
        */
      maxDistance /= 111.12;     

      var coords = [];
      coords[0] = req.query.longitude || 0;
      coords[1] = req.query.latitude || 0;

      console.log(req.query);
      console.log(maxDistance);
      console.log(limit);

      Location.find({
         local: {
            $near: coords,
            $maxDistance: maxDistance
         }
      }).limit(limit).exec(function(err, locations) {
         if (err) {
            return res.json(500, err);
         }
         res.status(200).json(locations);
      });
   }  
};
