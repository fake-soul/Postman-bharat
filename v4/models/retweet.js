var mongoose = require("mongoose");

var retweetSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Retweet", retweetSchema);