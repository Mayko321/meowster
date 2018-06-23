const express = require("express");
const app = express ();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const userSchema = require('./users');

//instructing the app to use body parser
app.use(bodyParser.json());

//our user model schema
const User = mongoose.model('User', userSchema);

//connecting the app to mongoose
//the link is the a cloud database storage called mLabs sandbox
mongoose.connect ('mongodb://maykie:cheese123@ds261540.mlab.com:61540/meowster');
const db = mongoose.connection;

//gets the homepage for you
app.get('/', function(req, res){
  res.send('Welcome to the Meowster landing page!');
    
});

//gets the list of users from the database






app.get('/', (req, res) => res.send('Alls Good'));
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
    
  });