var express = require("express");
var router  = express.Router({mergeParams: true});
var Tweet = require("../models/tweet");
var Retweet = require("../models/retweet");
var middleware = require("../middleware");

//Retweets New
router.get("/new",middleware.isLoggedIn, function(req, res){
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

//Retweets Create
router.post("/",middleware.isLoggedIn,function(req, res){
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
               //add username and id to retweet
               retweet.author.id = req.user._id;
               retweet.author.username = req.user.username;
               //save retweet
               retweet.save();
               tweet.retweets.push(retweet);
               tweet.save();
               console.log(retweet);
               res.redirect('/tweets/' + tweet._id);
           }
        });
       }
   });
});

// RETWEET EDIT ROUTE
router.get("/:retweet_id/edit", middleware.checkRetweetOwnership, function(req, res){
   Retweet.findById(req.params.retweet_id, function(err, foundRetweet){
      if(err){
          res.redirect("back");
      } else {
        res.render("retweets/edit", {tweet_id: req.params.id, retweet: foundRetweet});
      }
   });
});

// RETWEET UPDATE
router.put("/:retweet_id", middleware.checkRetweetOwnership, function(req, res){
   Retweet.findByIdAndUpdate(req.params.retweet_id, req.body.retweet, function(err, updatedRetweet){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/tweets/" + req.params.id );
      }
   });
});

// RETWEET DESTROY ROUTE
router.delete("/:retweet_id", middleware.checkRetweetOwnership, function(req, res){
    //findByIdAndRemove
    Retweet.findByIdAndRemove(req.params.retweet_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/tweets/" + req.params.id);
       }
    });
});

module.exports = router;