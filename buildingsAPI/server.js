//server functionality created using the following tutorial: https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
//By Olatunde Garuba

var express = require("express"),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require("mongoose"),
	Building = require("./api/models/buildListModel"), //model is loaded here
	bodyParser = require("body-parser");

//mongoose connection URL 
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/BuildingDB", {useMongoClient: true}, function(err) {
    if(err) {
        console.log('Connection error');
			}
    });
	
app.use(bodyParser.urlencoded({extended: true}));//allows us to post nested objects
app.use(bodyParser.json());


var routes = require("./api/routes/buildListRoutes"); //import routes
routes(app); //register these routes

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log("Building RESTful API server started on: " + port);
