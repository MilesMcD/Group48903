var Observable = require("data/observable").Observable;
var mapsModule = require("nativescript-google-maps-sdk");
var pageModule = require("tns-core-modules/ui/page");
var { Accuracy } = require("ui/enums");
var dialogs = require("ui/dialogs");
var http = require("http");


/*
	Hicks: 42.289148, -85.600481
	Stetson: 42.289628, -85.601523
	Dewing: 42.290112, -85.601899
	Mandelle: 42.290104, -85.601009
	Olds Upton: 42.290064, -85.600054
	Hoben: 42.289604, -85.599475
	DeWaters: 42.289294, -85.602399 	
	Trowbridge: 42.289712, -85.602685
	Arcus Center: 42.290133, -85.603968
	Harmon: 42.290089, -85.599326
	Upjohn Library: 42.290741, -85.601811
	Fine Arts Building: 42.290798, -85.600641
	Dow Science Center: 42.291871, -85.600345
	Severn: 42.291458, -85.598401
	Crissey: 42.291176, -85.598016
	
	*/
/*
HTTP REQUEST TESTING
*/	
dialogs.alert("test alert functionality").then(function() {console.log("Dialog Closed.");});
var response = http.getJSON("http://10.0.2.2:3000/buildings").then(function(r) {
	console.dump(r);
}
	

var testLocs = ["42.289148, -85.600481", "42.289628, -85.601523", "42.290112, -85.601899", "42.290104, -85.601009", "42.290064, -85.600054", "42.289604, -85.599475"];

/*
This function will take strings of format "lat, lng" and turn them into an integer array.
It strips most punctuation to be safe.
 */
function latLngToMaps(locString) {
var cleaned = locString.replace(/[,\/#!$%\^&\*;:{}=_`~()]/g,"");
var split = cleaned.split(" ");
var latLng = [parseFloat(split[0]), parseFloat(split[1])];
return  latLng;
	
	}

var mapView;
function createViewModel() {
    var viewModel = new Observable();
    viewModel.latitude = 42.290447;
    viewModel.longitude = -85.601068;
    viewModel.zoom = 18;





	viewModel.onMapReady = function(args) {
		mapView = args.object;
		for(var i = 0; i < testLocs.length;i++)
		{
			var marker = new mapsModule.Marker();
			marker.position = mapsModule.Position.positionFromLatLng(
			latLngToMaps(testLocs[i])[0], latLngToMaps(testLocs[i])[1]);
			mapView.addMarker(marker);
		}
	}
	    return viewModel;
}

exports.createViewModel = createViewModel;