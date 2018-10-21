var express = require("express");
var router  = express.Router();
var Tweet = require("../models/tweet");

//INDEX - show all tweets
router.get("/", function(req, res){
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
router.post("/", function(req, res){
    // get data from form and add to tweets array
    var name = req.body.name;
    var str = req.body.str;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newTweet = {name: name, str: str, author:author}
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
router.get("/new", isLoggedIn, function(req, res){
   res.render("tweets/new"); 
});

// SHOW - shows more info about one tweet
router.get("/:id", function(req, res){
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

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
