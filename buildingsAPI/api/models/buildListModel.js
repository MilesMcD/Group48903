'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/*
This script provides our database with a "skeleton" for every entry.

By Miles McDowall
*/
//Schema for database insertions
//"default" and "required" text written by Torey.
var BuildingSchema = new Schema({
name: {type: String,
		   required: "Please enter a building name."
		  },
description: {type: String,
		   default: "Description not yet created."
		  },
moreInfo: {type: String,
		   default: "More information not yet available."
		  },
hours: {type: String,
		   required: "Please enter the building's hours."
		  },
latlng: {type: String,
		   required: "Please enter the location of the building."
		  },
machines: {type: Array,
		   default: ["Water Fountain"]
		  },
malfunction: {type: Array,
		   default: [0]
		  }


	
});
//'module' is this node.js file. Exports will be exposed as a module that you can import and use elsewhere.
module.exports = mongoose.model('Buildings', BuildingSchema);
