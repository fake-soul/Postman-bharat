var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Tweet  = require("./models/tweet"),
    Retweet     = require("./models/retweet"),
    User        = require("./models/user")
    // seedDB      = require("./seeds")
    
//requiring routes
var retweetRoutes    = require("./routes/retweets"),
    tweetRoutes = require("./routes/tweets"),
    indexRoutes      = require("./routes/index")
    
mongoose.connect("mongodb://localhost/tweet_v11");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "FaKeSoUL",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/tweets", tweetRoutes);
app.use("/tweets/:id/retweets", retweetRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The tweet Server Has Started!");
});