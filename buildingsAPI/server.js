//server functionality created using the following tutorial: https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
//By Olatunde Garuba
//Testing Assistance provided by Erik Hartig
//Server runs on localhost:3000 by default.

/*
This script sets up the server for communication using an express app & mongoose.

By Miles McDowall
*/

var express = require("express"),
	app = express(),
	port = process.env.PORT || 3000, //This is the server port
	mongoose = require("mongoose"), //communicate with MongoDB server.
	Building = require("./api/models/buildListModel"), //model is loaded here
	bodyParser = require("body-parser"); //Used to parse different kinds of requests.

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


/*
Serve 404 errors to incorrect routes.
*/
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log("Building RESTful API server started on: " + port);
