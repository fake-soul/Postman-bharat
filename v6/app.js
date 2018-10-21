var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Tweet  = require("./models/tweet"),
    Retweet     = require("./models/retweet"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/tweet_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

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


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all tweets
app.get("/tweets", function(req, res){
    // Get all tweets from DB
    Tweet.find({}, function(err, allTweets){
       if(err){
           console.log(err);
       } else {
          res.render("tweets/index",{tweets:allTweets});
       }
    });
});

//CREATE - add new tweet to DB
app.post("/tweets",function(req, res){
    // get data from form and add to tweets array
    var name = req.body.name;
    var str = req.body.str;
    var newTweet = {name: name, str: str}
    // Create a new tweet and save to DB
    Tweet.create(newTweet, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to tweets page
            res.redirect("/tweets");
        }
    });
});

//NEW - show form to create new tweet
app.get("/tweets/new",isLoggedIn , function(req, res){
   res.render("tweets/new"); 
});

// SHOW - shows more info about one tweet
app.get("/tweets/:id", function(req, res){
    //find the tweet with provided ID
    Tweet.findById(req.params.id).populate("retweets").exec(function(err, foundTweet){
        if(err){
            console.log(err);
        } else {
            console.log(foundTweet)
            //render show template with that tweet
            res.render("tweets/show", {tweet: foundTweet});
        }
    });
});


// ====================
// ROUTES
// ====================

app.get("/tweets/:id/retweets/new",isLoggedIn, function(req, res){
    // find tweet by id
    Tweet.findById(req.params.id, function(err, tweet){
        if(err){
            console.log(err);
        } else {
             res.render("retweets/new", {tweet: tweet});
        }
    })
});

app.post("/tweets/:id/retweets",isLoggedIn, function(req, res){
   //lookup tweet using ID
   Tweet.findById(req.params.id, function(err, tweet){
       if(err){
           console.log(err);
           res.redirect("/tweets");
       } else {
        Retweet.create(req.body.retweet, function(err, retweet){
           if(err){
               console.log(err);
           } else {
               tweet.retweets.push(retweet);
               tweet.save();
               res.redirect('/tweets/' + tweet._id);
           }
        });
       }
   });
   //create new retweet
   //connect new retweet to tweet
   //redirect tweet show page
});

//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/tweets"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/tweets",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/tweets");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});