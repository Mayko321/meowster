const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating multiple users schema and model
const UserSchema = Schema({
  
  email:{
    type: String,
    required: [true, 'Email is required'], 
  },
  
  firstname:{
    type: String,
    required: [true, 'First name is required'], 
  },
  surname:{
    type:String,
    required: [true, 'Surname is required'],
  },
 
  password: {
    type: String, 
    required:[true, 'password is required'],
  }
  
});
 
//our user model 
const User = mongoose.model('user', UserSchema);

//making this model available to the server
module.exports = User;



