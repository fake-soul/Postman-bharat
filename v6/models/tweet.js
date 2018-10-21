var mongoose = require("mongoose");

var tweetSchema = new mongoose.Schema({
   name: String,
   str: String,
   retweets: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Retweet"
      }
   ]
});

module.exports = mongoose.model("Tweet", tweetSchema);