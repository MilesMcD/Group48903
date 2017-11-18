"use strict";
/*
This script handles our server routing. It defines how our CRUD operations will work.

By Miles McDowall
*/
var mongoose = require("mongoose"),
	Building = mongoose.model("Buildings");

//LIST ALL BUILDINGS.	
exports.list_all_buildings = function(request, response) {
	Building.find({}, function(err, building) {
		if (err)
			response.send(err);
		response.json(building);
		
	});
	
};
//LIST ONE BUILDING.
exports.list_a_building = function(request, response) {
	Building.findOne({name: request.params.buildName}, function(err, building) {
		if (err)
			response.send(err);
		else{
			response.json({building});
			}
	});
};
//CREATE BUILDINGS
exports.create_a_building = function(request, response) {
	var new_building = new Building(request.body);
	new_building.save(function(err, building) {
		if (err)
		{
			response.send(err);
		}	
		else
		response.json(building);
		
	});
	
};
//DELETE ALL BUILDINGS
exports.delete_all_buildings = function(request, response) {
	Building.remove({}, function(err, building) {
	if (err)
		response.send(err);
	else
		response.json({message: "All building deleted."});
	});
	
};

//DELETE A BUILDING
exports.delete_a_building = function(request, response) {
	Building.findOneAndRemove({name: request.params.buildName}, function(err, building) {
		if (err)
			response.send(err);
		else
		response.json({ message: "building Deleted Successfully."});
		
	});
	
};

//UPDATE BROKEN STATUS OF MACHINES
//The updated machine status array will be sent in the request body. (http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
exports.update_machine = function(request, response) {
	Building.findOneAndUpdate({name: request.params.buildName}, request.body, {new: true}, function(err, machine) {
		if (err)
			response.send(err);
		response.json(machine);
		
	});
	
};

