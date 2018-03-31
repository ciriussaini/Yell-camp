var mongoose=require("mongoose");

//SCHEMA SETUP (files would be very long)
var campgroundsSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
    	id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
    	},
    	username: String
    },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Campground = mongoose.model("Campground",campgroundsSchema);
module.exports = Campground;