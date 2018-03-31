//C:\Program Files\MongoDB\Server\3.6\bin
//C:\Users\dvl\Desktop\Html\Node Js\camp
//E:\work\Web Development Bootcamp\40 Code 21-37'
//Slideshow
// github.com/nax3t/background-slider

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    passport   = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy= require("passport-local"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment");
    User       = require("./models/user");

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes      = require("./routes/index");
//seedDB();//Seed the database
mongoose.connect("mongodb://localhost/yell_camp_v12");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.static(__dirname + "/public"));
app.use(flash());
//Passport configuration
app.use(require("express-session")({
    secret: " Rusty is the best and cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.eror = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen("3000",function(){
    console.log("Server started At port 3000");
});

//Campground.collection.drop();