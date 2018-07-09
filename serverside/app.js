const express = require("express");
const app = express ();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const User = require('./models/users');
const Cat = require('./models/cat');

//make sure that the app is showing the static pages
app.use(express.static('../public'));


//instructing the app to use body parser which will help us pass json data
app.use(bodyParser.json());

//connecting to cloud database storage called mLabs sandbox
mongoose.connect ('mongodb://maykie:cheese123@ds261540.mlab.com:61540/meowster');
const db = mongoose.connection;
mongoose.Promise = global.Promise;

//error handling middleware
app.use(function(error,req,res,next){
  res.status(422).send({error:err.message}); //this will send back a message to the user saying where the error is
});


//The api for our web application STARTS HERE:
//gets the homepage for you
app.get('/homepage', function(req, res,next){
  res.send('Welcome to the Meowster home page!');   
});


//gets the signup page
app.get('/signup', function(req,res,next){
     res.send('new users signup');
});

//gets the login page
app.get('/login',function(req,res,next){
  res.send('User login');
});

                                            //New user section

//adding a new user to the database
app.post('/newuser',function(req,res,next){
  User.create(req.body).then(function(user){
    res.send(user);  
  });
//     .catch(next); 
});


//show new user profile page
app.get('/profile',function(req,res,next){
  res.send('user profile');    
});


// updating a particular user account with their new details to the database
app.put('/updateuser/:id', function(req,res,next){
  User.findByIdAndUpdate({_id: req.params.id}, req,res.body).then(function(){
    User.findOne({_id: req.params.id}).then(function(user){
      res.send(user);
    });    
  }); 
});


//user can delete their account using parameters to select a specific user
app.delete('/user/:id',function(req,res,next){
  User.findByIdAndRemove({_id:req.params.id}).then(function(user){
      res.send(user);
  });
});



                                          //the cat section//
//adding a new cat to the database
app.post('/newcat',function(req,res,next){
  Cat.create(req.body).then(function(cat){
   res.send(cat);   
  }).catch(next);    
});


//updating the cat profile
//here we have added parameters to update a particular account
app.put('/updatecat/:id',function(req,res,next){
  Cat.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){ 
    Cat.findOne({_id: req.params.id}).then(function(cat){ //this allows us to update the output in our terminal to the new details updated.
       res.send(cat);
    });
    
  });
});
        
        
//to delete an account
//here we have added parameters to delete a specific account
app.delete('/cat/:id', function(req,res,next){
  Cat.findByIdAndRemove({_id: req.params.id}).then(function(cat){
    res.send(cat);
  });
});

//find the geo location of a cat nearby given a specific coordinates using an aggregate in the api which will search the whole list of cats based on the geomtery settings.
app.get('/cat/:id', function(req, res, next){
  Cat.aggregate(
    [
      { "$geoNear": {
        "near": { 
            "type": "Point", 
            "coordinates": [parseFloat(req.query.lng),parseFloat(req.query.lat)]
        },
        "distanceField": "dist.calculated",
        "maxDistance": 999999,
        "spherical": true,
        "key": "geometry"
      }}
    ],
    function(err,cats) {
      res.send(cats);
    }
  );

//   Cat.geoNear(
//     //{type:'point', coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
//     {type:'Point', coordinates:[153.027117, -27.468515]},
//     {maxDistance: 999999, spherical: true}
//   ).then(function(cat){
//     res.send(cat);  
//   });
});



app.get('/', (req, res) => res.send('Alls Good'));


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
    
  });