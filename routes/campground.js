var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

// INDEX - Shows all campgrounds
router.get("/",function(req,res){
// Get all campgrounds from db

	Campground.find({},function(err,allCampgrounds){
	if(err) 
	{
		console.log("err");
	}
	else
	{
		res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
	}
});
});

// Create - add new campground to db
router.post("/", middleware.isLoggedIn ,function(req,res){
	var name  = req.body.name;
	var image = req.body.image;
	var desc  = req.body.description;
	var author ={
		id: 	 req.user._id,
		username: req.user.username
	}
	var newCampground={ name: name, image: image, description : desc,author:author};
	
	//campgrounds.push(newCampground);
	//and using save method to create new entity an differnet mehtod
	// Adding to databases
	Campground.create(newCampground,function(err,campground){
	if(err){
		console.log("err");
	}
	else
	{
	console.log(campground)	;
	res.redirect("/campgrounds");
	}
});
});

//	NEW - Shows form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
 res.render("campgrounds/new");
});

//	SHOW - Shows info about one campground
router.get("/:id",function(req,res){
	
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
	if(err)
	{
		console.log(err);
	}
	else
	{
		//render show template with that campground
		res.render("campgrounds/show",{campground:foundCampground});
	}
	});
});
//Edit Campground Route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
		{
			req.flash("error","Campground Not Found.");
			res.redirect("/campgrounds");
		}
		else{
			res.render("campgrounds/edit",{campground:foundCampground});
		}
	});
});

//Update Campground Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){ 
	//find and update the correct campground and redirect it somewhere
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err)
		{
			req.flash("error","Campground Not Found");
			res.redirect("/campgrounds");
		}
		else{
			req.flash("success","Successfully updated");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//Destroy Campground Route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err)
		{
			req.flash("error","Campground Not Found");
			res.redirect("/campgrounds");
		}
		else
		{
			req.flash("success","Successfully Deleted");
			res.redirect("/campgrounds");	
		}

	});
});
module.exports = router;