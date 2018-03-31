var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

router.get("/new", middleware.isLoggedIn ,function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("comments/new",{campground : campground});
		}
	});
});

router.post("/", middleware.isLoggedIn , function(req,res){
	// Look up campgrounf using id and 
	// create a new comment and 
	// than connect new comment to campground
	// Redirect to campground / show page
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}
		else
		{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
				{
					req.flash("error","Something Went Wrong");
					console.log(err);
				}
				else{
					//Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added Comment");
					res.redirect('/campgrounds/' +campground.id);
				}
			});
		}

	});
});
//comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership ,function(req,res){
		Comment.findById(req.params.comment_id,function(err,findComment){
			if(err)
			{
				console.log(err);
				res.redirect("back");
			}
			else
			{
				res.render("comments/edit",{campground_id : req.params.id , comment : findComment});
			}
		});
});
//comments update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			req.flash("success","Comment Updated");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
});
//Comment destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	//findById and remove
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			req.flash("success","Comment Deleted");
			res.redirect("/campgrounds/"+ req.params.id );
		}
	});
});

module.exports = router;