var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var http = require("http");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;

/*
This script builds our building description page.

Assisted by this tutorial: http://pointdeveloper.com/create-pages-in-nativescript/
						   http://pointdeveloper.com/navigate-pages-nativescript-parameters/
						   by Prantik Vaghela

By Miles McDowall
*/
var buildingInfo;
/*
This code programmatically fills in information about the buildings using a get request to the database.

*/
function onNavigatingTo(args) {
    var page = args.object;
	page.addCss(".title { font-size: 32; }");
	var buildingName = page.navigationContext.param1;
	
	//Build the page
	http.getJSON("http://10.0.2.2:3000/buildings/" + buildingName).then(function (r) {	
	buildingInfo = r;
	
	
	var name = page.getViewById("name");
	name.text = r.building.name;
	var desc = page.getViewById("desc");
	desc.text = r.building.description;
	var hours = page.getViewById("hours");
	hours.text = r.building.hours;
	var machines = page.getViewById("machines");
	machines.text = "Services present: \n";
	//Check for unavailable services.
	for (var i = 0;i<r.building.machines.length;i++)
	{
		for (var j = 0; j<r.building.malfunction.length; j++)
		{
			
			if (r.building.malfunction[j] == r.building.machines[i])
			{
				machines.text += "Unavailable: "
			}
		}
		machines.text += r.building.machines[i] + "\n";
		
	}
		}, function (e) {
    throw exception(e);
		});	
}
/*
This function gives us prototype support for status reports on machines.

*/
function statusReport(args) {
	dialogs.prompt("Enter the base 0 location of the machine.", "").then(function (r) {
		console.log("Dialog result: " + r.result + ", text: " + r.text);
	if (r.result)
	{
		responseInt = parseInt(r.text);
		
		if (responseInt > -1 && responseInt < buildingInfo.building.machines.length)
		{
			var theMachine = buildingInfo.building.machines[responseInt];
			var malfunctionArray = buildingInfo.building.malfunction;
			console.log(theMachine);
			//Check to see if the machine is in the array. Remove it if it is. Yep.
			var machIndex = malfunctionArray.indexOf(theMachine);
			console.log(machIndex);
			if (machIndex > -1)
			{
				malfunctionArray.splice(machIndex, 1 );
			}
			else 
			{
				malfunctionArray.push(theMachine);
			}
			http.request({
			url: "http://10.0.2.2:3000/buildings/" + buildingInfo.building.name,
			method: "PUT",
			headers: { "Content-Type": "application/json"},
			content: JSON.stringify({malfunction: malfunctionArray})
			}).then(function(r) { 
			response = r.content.toJSON();
			}, function(e) {
			throw exception(e);
			});
		}
	}
	
});

}

exports.onNavigatingTo = onNavigatingTo;
exports.statusReport = statusReport;