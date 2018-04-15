var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

var getDate = function(){
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  date = new Date(),  day = date.getDate(), month = monthNames[ date.getMonth() ], year = date.getFullYear();
  return day+"-"+month+"-"+year;
};
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
	var price = req.body.price;
	var desc  = req.body.description;
	var author ={
		id: 	 req.user._id,
		username: req.user.username
	};
	var date = getDate();
    var newCampground={ name: name,
	 image: image, 
	 description : desc,
	 date_created : date,
	 author:author,
	 price: price};

    Campground.create(newCampground ,function(err,campground)
    {
        if(err)
        {
          req.flash("error",err.message);
        }
        else
            {
                req.flash("success","New Campground added successfully!");
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