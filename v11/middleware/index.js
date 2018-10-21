var Tweet = require("../models/tweet");
var Retweet = require("../models/retweet");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkTweetOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Tweet.findById(req.params.id, function(err, foundTweet){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the tweet?
            if(foundTweet.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkRetweetOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Retweet.findById(req.params.retweet_id, function(err, foundRetweet){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundRetweet.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;