var Tweet = require("../models/tweet");
var ReTweet = require("../models/retweet");

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

// middlewareObj.checkCommentOwnership = function(req, res, next) {
//  if(req.isAuthenticated()){
//         ReTweet.findById(req.params.comment_id, function(err, foundComment){
//            if(err){
//                res.redirect("back");
//            }  else {
//                // does user own the retweet?
//             if(foundComment.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         res.redirect("back");
//     }
// }

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;