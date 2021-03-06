var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/tweet");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var tweetSchema = new mongoose.Schema({
   name: String,
   str: String
});

var Tweet = mongoose.model("Tweet", tweetSchema);

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
          res.render("index",{tweets:allTweets});
       }
    });
});

//CREATE - add new tweet to DB
app.post("/tweets", function(req, res){
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
app.get("/tweets/new", function(req, res){
   res.render("new.ejs"); 
});

// SHOW - shows more info about one tweet
app.get("/tweets/:id", function(req, res){
    //find the tweet with provided ID
    Tweet.findById(req.params.id, function(err, foundTweet){
        if(err){
            console.log(err);
        } else {
            //render show template with that tweet
            res.render("show", {tweet: foundTweet});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Tweet Server Has Started!");
});