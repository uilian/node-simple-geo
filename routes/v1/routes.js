const express = require('express');
const router = express.Router();
const hotspotsController = require('../../controllers/v1/hotspots');

var url = '';

/* Variable initialization and follow to next middleware  */
router.use(function(req, res, next) {
   url = `${req.protocol}://${req.get('host')}/api`;
   next(); // make sure we go to the next routes and don't stops here
});

router.get('/v1', function(req, res) {
   res.json({
      version: 'v1',
      message: 'Welcome to the wifi hotspots API!',
      endpoints: [
         {
            name: 'hotspots',
            path: url + '/v1/hotspots',
            description: 'List of wifi hotspots available',
            method: 'GET',
            parameters: '[latitude: float, longitude: float, distance: integer]'
         }
      ]
   });
});

router.get('/v1/hotspots', hotspotsController.list);

module.exports = router;
