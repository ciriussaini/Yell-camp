var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

var Campground = require("../models/campground");


router.get("/",function(req,res){
    res.render("landing");
});

//search register form
router.post("/campgrounds/search",function(req,res){
    search = req.body.search;
    Campground.find({},function(err,allCampgrounds){
  if(err) 
  {
    console.log("err");
  }
  else
  {
    res.render("campgrounds/search",{campgrounds:allCampgrounds,search:search});
  }
   }); 
});


//show register form
router.get("/register",function(req,res){
	res.render("register");
});
//Handle signup logic
router.post("/register",function(req,res){
	 var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success","Successfully Signed Up! Nice to meet you  "+user.username );
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash : "Username or Password is wrong! Try Again",
        successFlash: "Welcome!"
    })
);/*
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    })
);*/

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","Logged You Out")
   res.redirect("/campgrounds");
});
module.exports = router;