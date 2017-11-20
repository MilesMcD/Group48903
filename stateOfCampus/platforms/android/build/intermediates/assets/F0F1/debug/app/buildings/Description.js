var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var http = require("http");

/*
This script builds our building description page.

By Miles McDowall
*/
function onNavigatingTo(args) {
    var page = args.object;
	var buildingName = page.navigationContext.param1;
	http.getJSON("http://10.0.2.2:3000/buildings/" + buildingName).then(function (r) {
	name = page.getViewById("name");
	name.text = r.building.name;
	
		}, function (e) {
    throw exception(e);
		});	
}
exports.onNavigatingTo = onNavigatingTo;