'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//Schema for database insertions
var BuildingSchema = new Schema({
	name: {
		type: String,
		required: "Please enter a building name."
	},
	Created_date: {
		type: Date,
		default: Date.now
		
	},
	machines: {
		type: Array,
		default: ["Printer", "Fountain"]
		
	}
	
	
});
//'module' is this node.js file. Exports will be exposed as a module that you can import and use elsewhere.
module.exports = mongoose.model('Buildings', BuildingSchema);