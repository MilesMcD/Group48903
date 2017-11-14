'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//Schema for database insertions
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
condition: {type: String,
		   required: "Please enter the condition of the building's machine(s)."
		  },
machines: {type: Array,
		   default: []
		  },
malfunction: {type: Array,
		   default: []
		  }


	
});
//'module' is this node.js file. Exports will be exposed as a module that you can import and use elsewhere.
module.exports = mongoose.model('Buildings', BuildingSchema);
