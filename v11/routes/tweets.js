var express = require("express");
var router  = express.Router();
var Tweet = require("../models/tweet");
var middleware = require("../middleware");


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
router.post("/", middleware.isLoggedIn, function(req, res){
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
            console.log(newlyCreated);
            res.redirect("/tweets");
        }
    });
});

//NEW - show form to create new tweet
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT TWEET ROUTE
router.get("/:id/edit", middleware.checkTweetOwnership, function(req, res){
    Tweet.findById(req.params.id, function(err, foundTweet){
        res.render("tweets/edit", {tweet: foundTweet});
    });
});

// UPDATE TWEET ROUTE
router.put("/:id",middleware.checkTweetOwnership, function(req, res){
    // find and update the correct tweet
    Tweet.findByIdAndUpdate(req.params.id, req.body.tweet, function(err, updatedTweet){
       if(err){
           res.redirect("/tweets");
       } else {
           //redirect somewhere(show page)
           res.redirect("/tweets/" + req.params.id);
       }
    });
});

// DESTROY TWEET ROUTE
router.delete("/:id",middleware.checkTweetOwnership, function(req, res){
   Tweet.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/tweets");
      } else {
          res.redirect("/tweets");
      }
   });
});


module.exports = router;