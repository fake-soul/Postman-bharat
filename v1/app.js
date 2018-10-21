var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var tweets = [
        {name: "Salmon Creek", str: "Hello World"},
        {name: "Granite Hill", str: "Hello World"},
        {name: "Mountain Goat's Rest", str: "Hello World"},
        {name: "Salmon Creek", str: "Hello World"},
        {name: "Granite Hill", str: "Hello World"},
        {name: "Mountain Goat's Rest", str: "Hello World"}
];
    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/tweets", function(req, res){
    res.render("tweets",{tweets:tweets});
});

app.post("/tweets", function(req, res){
    // get data from form and add to tweets array
    var name = req.body.name;
    var str = req.body.str;
    var newTweet = {name: name, str: str}
    tweets.push(newTweet);
    //redirect back to tweets page
    res.redirect("/tweets");
});

app.get("/tweets/new", function(req, res){
   res.render("new.ejs"); 
});




// var express = require("express");
// var app = express();

// app.set("view engine","ejs");

// app.get("/",function(req,res)
// {
// 	res.render("landing");
// });

// app.get("/tweets",function(req,res)
// {
// 	var tweets=[
// 	{name: "Andrew Malcolm" , text:"For every retweet this gets, Pedigree will donate one bowl of dog food to dogs in need! 😊"}
// 	{name: "Harry Styles" , text:"All the love as always. H"}
// 	{name: "Adam Saleh" , text:"We got kicked out of a  Delta airplane because I spoke Arabic to my mom on the phone and with my friend slim... WTFFFFFFFF please spread"}
// 	{name: "Obama" , text:""Thank you for everything. My last ask is the same as my first. I'm asking you to believe—not in my ability to create change, but in yours.}
// 	{name: "Carter" , text:"HELP ME PLEASE. A MAN NEEDS HIS NUGGS"}
// 	]; 
// 	res.render("tweets");
// });
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
