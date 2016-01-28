var locationController = require('../controllers/location_api_v1');

var appRouter = function(app) {     
   var accountMock = {
     username: "uilian",
     password: "1q2w3e4r",
     twitter: "@uilian"
   }

   var db = [];
   db.push(accountMock);

   app.post("/auth", function(req, res) {
      var user = db.filter(
         function (item){
            return (item.username == req.body.username && item.password == req.body.password);
         }
      );

      if (user.length == 0){
         return res.send({"status": "error", "message": "wrong username or password"});
      } else {
         return res.send({"status":"success", "user" : user});
      }
   });

   app.get("/accounts", function(req, res) {            
      var user = db.filter(
         function (item){
            return (item.username == req.query.username && item.password == req.query.password);
         }
      )

      if (user.length == 0){
         return res.send({"status": "error", "message": "wrong username or password"});
      } else {
         return res.send({"status":"success", "accounts": db});
      }
   });

   // add new account
   app.post("/account", function(req, res) {
      if(!req.body.username || !req.body.password || !req.body.twitter) {
         return res.send({"status": "error", "message": "missing a parameter"});
      } else {
         db.push(req.body);
         return res.send({"status":"succes", "user": req.body});
      }
   });   

   // retuns a list of wifi spots
   app.get('/wifi/spots', locationController.listSpots);
}
 
module.exports = appRouter;
