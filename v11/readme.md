#Tweet

##Requriements:
1.Nodejs,NPM
2.install all packages listed in package.jason using "npm install <packagename> --save"
3.MongoDB:
	install and run MongoDB.
	Use below link to setup and run:
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

##Start:
1. if using a local server replace the following line of code in app.js 
	app.listen(process.env.PORT, process.env.IP, function(){
	   console.log("The tweet Server Has Started!");
	});
	with
	app.listen(3000, function(){
	   console.log("The tweet Server Has Started!");
	});

2. start the application using
	node app.js






##Version Details
##__--------------V1__---------------

Add Landing Page
Add Tweets Page that lists all tweets
Each Tweet has:

Name
Str
#Layout and Basic Styling

Create our header and footer partials
Add in Bootstrap
#Creating New Tweets

Setup new tweet POST route
Add in body-parser
Setup route to show form
Add basic unstyled form
#Style the tweets page

Add a better header/title
Make tweets display 
#Style the Navbar and Form

Add a navbar to all templates
Style the new tweet subbmition form

## __--------------- V2__---------------


#Add Mongoose

Install and configure Mongoose
Setup tweet model
Use tweet model inside of  routes
#Show Page

Add description to 
our Tweet model
Add a show route/template



##__--------------V3__--------------

#Refactor Mongoose Code

Create a models directory
 module.exports
#Add Seeds File

Add a seeds.js file
Run the seeds file

#Add the Retweet model!

 errors go away!
Display retweets on tweet show page

##__---------------v4__---------------
#Retweet New/Create

Add the retweet new and create routes
Add the new retweet form
#Style Show Page

Display retweets nicely

##__-------------V5__----------------
#Finish Styling Show Page

##__--------------v6__---------------
##Auth Pt. 1 - Add User Model

Define User model
##Auth Pt. 2 - Register

Configure Passport
Add register routes
Add register template
##Auth Pt. 3 - Login

Add login routes
Add login template
##Auth Pt. 4 - Logout/Navbar

Add logout route
Prevent user from adding a retweet if not signed in
Add links to navbar
##Auth Pt. 5 - Show/Hide Links

Show/hide auth links in navbar correctly

##__-------------------v7__---------------
##Refactor The Routes

Use Express router to reoragnize all routes

##__-----------------v8__---------------
##Users + Retweets

Associate users and retweets
Save author's name to a retweet automatically

##__----------------v9__---------------
##Users + Tweets

Prevent an unauthenticated user from creating a tweet
Save username+id to newly created tweet

##__----------------v10__----------------

## UI improvements

##__---------------v11__-----------------
Add Method-Override
Add Edit Route for Tweets
Add Link to Edit Page
Add Update Route
#Deleting Tweets

Add Destroy Route
Add Delete button
#Authorization Part 1: Tweets

User can only edit his/her tweets
User can only delete his/her tweets
Hide/Show edit and delete buttons
#Editing Retweets

Add Edit route for retweets
Add Edit button
Add Update route
#Deleting Retweets

Add Destroy route
Add Delete button
#Authorization Part 2: Retweets

User can only edit his/her retweets
User can only delete his/her retweets
Hide/Show edit and delete buttons
Refactor Middleware
