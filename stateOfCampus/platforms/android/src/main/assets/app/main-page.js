/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
var createViewModel = require("./main-view-model").createViewModel;
var mapsModule = require("nativescript-google-maps-sdk");
var dialog = require("ui/dialogs");
var http = require("http");


/*
Event handler for moving to the correct page. Currently displays marker information in dialog and console. 
*/
function onMarkerEvent(args) {
	dialog.alert(args.marker.title);
   console.log("Marker Event: '" + args.eventName
                + "' triggered on: " + args.marker.title
                + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
}
function onNavigatingTo(args) {

/*	
	populate building info in the database. Uncommenting this code will duplicate the database if you already have a copy!
*/
/*
var campusBuildings =
[
	{
		"name"		: "Anderson Athletic Center",
		"description"	: "Anderson Athletic Center is home to the practice and competition arena for the Kalamazoo.",
		"moreInfo"	: "The main lobby (east entrance) serves as entrance for varsity athletic contests and houses",
		"hours"		: "Monday:	06:30AM - 12:00AM (Kalamazoo College ID required to gain access after 5:00PM)",
		"latlng"	: "42.290059, -85.598369",
		"condition"	: "good",
		"machines"	: ["machine that kill you lol", "a water fountain"],
		"malfunction"	: [0, 0]
	},
	{
		"name"		: "Welcome Center",
		"description"	: "it admisses u",
		"moreInfo"	: "ya",
		"hours"		: "Monday:	00:00 - 00:00",
		"latlng"	: "42.292138, -85.601180",
		"condition"	: "good",
		"machines"	: ["machine that kill you lol", "a water fountain"],
		"malfunction"	: [0, 0]
	},
	{
		"name"		: "Arcus Center for Social Justice Leadership",
		"description"	: "The Arcus Center for Social Justice Leadership (ACSJL) is an initiative of Kalamazoo College",
		"moreInfo"	: "Social Justice recognizes the inherent dignity of all people and values every life equally.",
		"hours"		: "Monday:	00:00 - 06:00PM",
		"latlng"	: "42.290148, -85.603558",
		"condition"	: "good",
		"machines"	: ["machine that kill you lol", "a water fountain"],
		"malfunction"	: [0, 0]
	}
];


for (var i = 0; i < campusBuildings.length; i++)
{
	var myJSON = JSON.stringify(campusBuildings[i]);
	http.request({
		url: "http://10.0.2.2:3000/buildings",
		method: "POST",
		headers: { "Content-Type": "application/json"},
	content: myJSON
		}).then(function(r) { 
		response = r.content.toJSON();
		}, function(e) {
			throw exception(e)
		});
}
	
	*/
	
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onMarkerEvent = onMarkerEvent;