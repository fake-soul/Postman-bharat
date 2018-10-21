var mongoose = require("mongoose");
var Tweet = require("./models/tweet");
var Retweet   = require("./models/retweet");

var data = [
    {
        name: "Cloud's Rest", 
        str: "Hello from bharat 1",
    },
    {
        name: "Desert Mesa", 
        str: "Hello from bharat 2",
    },
    {
        name: "Canyon Floor", 
        str: "Hello from bharat 3",
    }
]

function seedDB(){
   //Remove all tweets
   Tweet.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed tweets!");
        //  //add a few tweets
        // data.forEach(function(seed){
        //     Tweet.create(seed, function(err, tweet){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a tweet");
        //             //create a retweet
        //             Retweet.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, retweet){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         tweet.retweets.push(retweet);
        //                         tweet.save();
        //                         console.log("Created new retweet");
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few retweets
}

module.exports = seedDB;