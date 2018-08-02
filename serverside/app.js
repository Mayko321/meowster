const express = require("express");
const app = express ();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const User = require('./models/users');
const Cat = require('./models/cat');
var session = require('client-sessions');

//we use session to ensure that the user is able to be logged in for a certain period of time before
//the server stops talking to the client side and logs out.
app.use(session({
  cookieName: 'session',
  secret: 'sessions for meowster',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//make sure that the app is showing the static pages
app.use(express.static('../public'));//allows access to the public folder
app.use(express.static('images')); //allows access to the images folder

//telling the app to use jade templating language
app.set('views', './views')
app.set('view engine', 'jade')

//instructing the app to use body parser which will help us pass json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
app.get('/', function(req, res,next){
  console.log("homepage is up");
  res.render('index');
});

//gets the about us page when clicked on
app.get('/aboutus', function(req, res,next){
  console.log("about us page is up");
  res.render('aboutus');
});

//gets the sponsor page when clicked on
app.get('/sponsor', function(req, res,next){
  console.log("sponsor page is up");
  res.render('sponsor');
});

//gets the register page when it is clicked on
app.get('/register', function(req,res,next){
  if (req.session.user){
    res.redirect('/userprofile') //checks if user is already logged in, if they are they are directed to the userprofile page
  }
  res.render('register');
});

//gets the login page
app.get('/login',function(req,res,next){
  if (req.session.user){
    res.redirect('/userprofile')//checks if user is already logged in, if they are they are directed to the userprofile page
  }
  res.render('login');
});

                                      //adding a new user to the data


//sending the new user data to sandbox in mlab
app.post('/register', function(req,res){
  if(req.body.passwordcheck && req.body.emailcheck && req.body.firstnamecheck && req.body.surnamecheck)
  {
    User.create({
      firstname: req.body.firstnamecheck,
      surname: req.body.surnamecheck,
      email: req.body.emailcheck,
      password: req.body.passwordcheck
      
    },
    function (err, users){
      if (err) return res.render('register', {"errorString": err});
       res.redirect('/login') //when the user signs in it redirects the user to the login page.
    });          
    
  }else{
    res.render('register', {"errorString": "oops something went wrong please try and register again"});
  }
  
});

//writes the login request
app.post('/login',function(req,res,next){
  if (req.body.passwordcheck && req.body.emailcheck){
    User.findOne({email: req.body.emailcheck}, function(err, user){
      if (err) return handleError(err);
      if (user){
        
        if(req.body.passwordcheck === user.password){
          //sets a cookie with the users information
          req.session.user = user;
          res.redirect('/userprofile')
        }else{
          res.render('login', {"errorString": "ooopssomething went wrong please try and login again"});
        }
      }
      
    });
    
  }
    
});

//Redirects the login page to the user profile page
app.get('/userprofile', function(req,res){
  if (req.session && req.session.user){//this will check if the session exists and it will look up the user and pull their email address from it.
    User.findOne({email: req.session.user.email}, function(err, user){
      if(!user){
        //if the user isn't found in the database, this will reset the session information and
        //redirect the user to the login page 
        req.session.reset();
        res.redirect('/login');
      }else{
        res.render('userprofile', {"user": req.session.user});          
      }
    });    
  }else{
    res.redirect('/login')
  }
  
});

//updating the user profile page
app.post('/userprofile', function(req,res){
  if(req.body.firstname && req.body.lastname){
    if(req.session && req.session.user){  //this line here checks if the user exists
      //it will look up the user in the database by pulling their email from the session
      user.findOne({ emailcheck: req.session.user.emailcheck}, function(err, user_found){
        if (!user_found){
          //if the user isnt found in the database, reset the session information and redirect the user to the login page
          req.session.reset();
          res.status(500).send({
            "success": false, "msg":"unknown user failed to updated profile"
          });
        }else{
          //updates the users firstname, lastname,email and password
          user_found.firstnamecheck=req.body.firstnamecheck;
          user_found.surnamecheck=req.body.surnamecheck;
          user_found.emailcheck=req.body.emailcheck;
          user_found.passwordcheck=req.body.passwordcheck
          user_found.save(function(err, doc){
            if (err) return res.send(500, {"success":false, error:err});
            res.status(200).send({
              "success":true,"msg":"profile updated"
            });
          });
         
        }
      });
      
    }else{
      res.status(400).send({"error":"bad request"});
    }
  }else{
    res.status(400).send({"error": "bad request"});
  }
  
});

//to create a logout and make sure that the session resets by going back to the login page
app.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/login');
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

//gets the catreg page when it is clicked on from the user profile page
app.get('/catreg', function(req,res,next){
  if (!req.session.user){//the ! tells the app to redirect the user to the userprofile page if they arent logged in.
    res.redirect('/userprofile') 
  }
  res.render('catreg');
});


                                          //the cat section//

//sending the new cat data to sandbox on mlab
app.post('/catreg', function(req,res){

  if(req.body.catnamecheck && req.body.catgendercheck && req.body.catagecheck && 
     req.body.charitycheck && req.body.breedcheck)
  {
    Cat.create({
      name: req.body.catnamecheck,
      gender: req.body.catgendercheck,
      age: req.body.catagecheck,
      breed: req.body.breedcheck,
      charity: req.body.charitycheck
      
    },
    function (err, cat){
      if (err) return res.render('catreg', {"errorString": err});
       res.redirect('catprofile') //when the user signs in it redirects the user to the cat register page.
    });          
    
  }else{
    res.render('catreg', {"errorString": "oops something went wrong please try and register again"});
  }
  
});

//Redirects the cat register page to the cat profile page
app.get('/catprofile', function(req,res){
  if (req.session && req.session.cat){//this will check if the session exists and it will look up the user and pull their email address from it.
    Cat.findOne({name: req.session.cat.name}, function(err, user){
      if(!cat){
        //if the cat isn't found in the database, this will reset the session information and
        //redirect the cat to the login page 
        req.session.reset();
        res.redirect('/catreg');
      }else{
        res.render('catprofile', {"cat": req.session.cat});          
      }
    });    
  }else{
    res.redirect('/catprofile')
  }
  
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
});



app.get('/', (req, res) => res.send('/index'));


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
    
  });