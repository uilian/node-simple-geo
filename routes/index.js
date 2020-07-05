var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   res.json({
      message: 'Try accessing "/api"'
   });
});

router.get('/api', function(req, res) {
   res.json({
      message: 'Choose the API version, i.e., /api/v1'
   });
});

module.exports = router;
