'use strict';	


module.exports = function(app) {
	
	var buildList = require("../controllers/buildListController");
	
	//building list routes
	app.route("/buildings")
		.get(buildList.list_all_buildings)
		.post(buildList.create_a_building);
		
		
	app.route("/buildings/:buildName")
		.get(buildList.list_a_building)
		.delete(buildList.delete_a_building);
	/*	
	app.route("/buildings/:machineId")
		.get(buildList.get_a_machine)
		.put(buildList.update_machine);
	*/
};