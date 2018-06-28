const express = require("express");
const app = express ();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const UserSchema = require('./models/users');

//instructing the app to use body parser which will help us pass json data
app.use(bodyParser.json());




//connecting the app to mongoose
//the link is the a cloud database storage called mLabs sandbox
mongoose.connect ('mongodb://maykie:cheese123@ds261540.mlab.com:61540/meowster');
const db = mongoose.connection;

//gets the homepage for you
app.get('/homepage', function(req, res){
  res.send('Welcome to the Meowster home page!');
    
});

//gets the signup page
app.get('/signup', function(req,res){
  res.send('new users signup');
});


//add new user to the database
app.post('/user',function(req,res){
  res.send('new user');    
});

//show new user profile page
app.get('/profile',function(req,res){
  res.send('user profile');    
});

//user can update their details to the database
app.put('/update user', function(req,res){
  res.send({type:'update user details'});
});

//user can delete their account
app.delete('/user',function(req,res){
  res.send({type:'delete user account'});
});

//gets the login page
app.get('/login',function(req,res){
  res.send('User login');
  
});



app.get('/', (req, res) => res.send('Alls Good'));


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
    
  });