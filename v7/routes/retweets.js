var express = require("express");
var router  = express.Router({mergeParams: true});
var Tweet = require("../models/tweet");
var Retweet = require("../models/retweet");

// New
router.get("/new", isLoggedIn, function(req, res){
    // find tweet by id
    console.log(req.params.id);
    Tweet.findById(req.params.id, function(err, tweet){
        if(err){
            console.log(err);
        } else {
             res.render("retweets/new", {tweet: tweet});
        }
    })
});

// 
router.post("/",isLoggedIn,function(req, res){
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
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;