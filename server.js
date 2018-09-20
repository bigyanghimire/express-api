var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var Bear = require("./app/models/bear");
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  //this actually means /api
  res.json({ message: "hooray! welcome to our api!" });
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router
  .route("/bears") //this actually means/api/bears

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    var bear = new Bear(); // create a new instance of the Bear model
    bear.name = req.body.name; // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
      if (err) res.send(err);

      res.json({ message: "Bear created!" });
    });
  })
  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);

      res.json(bears);
    });
  });
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router
  .route("/bears/:bear_id")
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      res.json(bear);
    });
  })
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      bear.name = req.body.name; // update the bears info

      // save the bear
      bear.save(function(err) {
        if (err) res.send(err);

        res.json({ message: "Bear updated!" });
      });
    });
  })
  .delete(function(req, res) {
    Bear.remove(
      {
        _id: req.params.bear_id
      },
      function(err, bear) {
        if (err) res.send(err);

        res.json({ message: "Successfully deleted" });
      }
    );
  }); 

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api router prefix garna ko lagi
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
