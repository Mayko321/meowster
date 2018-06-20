var express = require("express");
var app = express ();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

//our user model schema
var User = mongoose.model('User',userSchema);

//making this model available to our users.
module.exports = {User: User};

//connecting the app to mongoose
//the link is the a cloud database storage called mLabs sandbox
mongoose.connect ('mongodb://maykie:cheese123@ds261540.mlab.com:61540/meowster');
var db = mongoose.connection;

//gets the requested page for you
app.get('/', function(req, res){
  res.send('Welcome to the Meowster landing page!');
  
  
});




app.get('/', (req, res) => res.send('Alls Good'));
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
    
  });