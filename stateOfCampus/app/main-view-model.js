


var Observable = require("data/observable").Observable;
var mapsModule = require("nativescript-google-maps-sdk");
var pageModule = require("tns-core-modules/ui/page");
var { Accuracy } = require("ui/enums");
var dialogs = require("ui/dialogs");
var http = require("http");


/*
TUTORIAL FOR GEOLOCATION & BASIC FRAMEWORK PROVIDED BY: https://code.tutsplus.com/tutorials/code-a-real-time-nativescript-app-geolocation-and-google-maps--cms-29001
by Wernher-Bel Ancheta

This page builds our map from the database. A function in the main-page is used to handle marker events, which allow us to access building pages.

By Miles McDowall

	*/
//var testLocs = ["42.289148, -85.600481", "42.289628, -85.601523", "42.290112, -85.601899", "42.290104, -85.601009", "42.290064, -85.600054", "42.289604, -85.599475"]; //Use this if the database breaks.

/*
This function will take strings of format "lat, lng" and turn them into an integer array.
It strips most punctuation to be safe. We use this to populate our markers.
 */
function latLngToMaps(locString) {
var cleaned = locString.replace(/[,\/#!$%\^&\*;:{}=_`~()]/g,"");
var split = cleaned.split(" ");
var latLng = [parseFloat(split[0]), parseFloat(split[1])];
return  latLng;
	
	}
	

var mapView;
/*
Prepares the view model & populates it with markers taken from the database.
*/
function createViewModel() {
    var viewModel = new Observable();
    viewModel.latitude = 42.290447;
    viewModel.longitude = -85.601068;
    viewModel.zoom = 18;

		/* JSON GET  */
	var getResponse;

	
	viewModel.onMapReady = function(args) {
		mapView = args.object;
		
		http.getJSON("http://10.0.2.2:3000/buildings/").then(function (r) {
			getResponse = r;
			for(var i = 0; i < getResponse.length;i++)
			{	//asynchronous function that populates our marker list.
				var marker = new mapsModule.Marker();
				var building = getResponse[i];
				var buildLatLng = latLngToMaps(getResponse[i].latlng);
				marker.title = getResponse[i].name;
				marker.position = mapsModule.Position.positionFromLatLng(
				buildLatLng[0], buildLatLng[1]);
				mapView.addMarker(marker);
			}
	
	
		}, function (e) {
    throw exception(e);
		});	

	}


	    return viewModel;
}

exports.createViewModel = createViewModel;