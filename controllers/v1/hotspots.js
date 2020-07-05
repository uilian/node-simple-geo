var location = require('../../models/v1/location.js');

module.exports = {
    list: (req, res, next) => {
        /**
         *  Convert distance by 111.12 (one degree is approximately 
         *  111.12 kilometers). More about mongodb geo-features: 
         *      http://bit.ly/1PDr9z0
         */
        var filters = {
            'limit': Number.parseInt(req.query.limit) || 10,
            'maxDistance': (req.query.distance || 1)/111.12,
            'coords': [
                req.query.longitude || -51.2,
                req.query.latitude || -30.03,
            ]
        }
        // console.log(filters);        
        location.filterByGeolocation(filters, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    }
};
