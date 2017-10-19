var Observable = require("data/observable").Observable;
var mapsModule = require("nativescript-google-maps-sdk");
var pageModule = require("tns-core-modules/ui/page");
var { Accuracy } = require("ui/enums");


function createViewModel() {
    var viewModel = new Observable();
    viewModel.latitude = 42.290447;
    viewModel.longitude = -85.601068;
    viewModel.zoom = 18;
	
	var mapView;
    return viewModel;
	
	viewModel.onMapReady = function(args) {
        mapView = args.object;
		}
}

exports.createViewModel = createViewModel;