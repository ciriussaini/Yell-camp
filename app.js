//C:\Program Files\MongoDB\Server\3.6\bin
//C:\Users\dvl\Desktop\Html\Node Js\camp\c-final

var express        = require("express"),
    app            = express(),
    methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    flash          = require("connect-flash"),
    LocalStrategy  = require("passport-local"),
    /*seedDB         = require("./seeds"),*/
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user");

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes      = require("./routes/index");

//Expreimental
//seedDB();//Seed the database

mongoose.connect("mongodb://localhost/yell_camp_v13");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));

//Passport configuration
app.use(require("express-session")({
    secret: " This string is set as an secret key for encryption",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
passport.authenticate('local', { successFlash: 'Welcome!' });

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.eror = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.search =req.search;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen("3000",function(){
    console.log("Server started At port 3000");
});
//dropping all values in database
//Campground.collection.drop();