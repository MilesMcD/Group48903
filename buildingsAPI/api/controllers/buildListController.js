"use strict";

var mongoose = require("mongoose"),
	Building = mongoose.model("Buildings");
	
exports.list_all_buildings = function(request, response) {
	Building.find({}, function(err, building) {
		if (err)
			response.send(err);
		response.json(building);
		
	});
	
};

exports.create_a_building = function(request, response) {
	var new_building = new Building(request.body);
	new_building.save(function(err, building) {
		if (err)
			response.send(err);
		response.json(building);
		
	});
	
};

exports.get_a_machine = function(request, response) {
	Building.findById(request.params.machineId, function(err, machine) {
		if (err)
			response.send(err);
		response.json(machine);
		
	});
	
};

exports.update_machine = function(request, response) {
	Building.findOneAndUpdate({_id: request.params.machineId}, request.body, {new: true}, function(err, machine) {
		if (err)
			response.send(err);
		response.json(machine);
		
	});
	
};

exports.delete_machine = function(request, response) {
	Building.remove({_id: request.params.machineId}, function(err, machine) {
		if (err)
			response.send(err);
		response.json({ message: "Machine Deleted Successfully."});
		
	});
	
};