const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating multiple users schema and model
const UserSchema = newSchema({
  
  firstName:{
    type: String,
    required: [true, 'First Name required'], 
},
  surname:{
    type:String,
    required: [true, 'Surname required'],
  },
  username: {
    type: String, 
    required: true, 
    unique: true
  },
  userId: {
    type: Number, 
    required: true, 
    unique: true
  },
  password: {
    type: String, 
    required:true
  },
  age:Number,
  dateOfBirth:Number

});

//our user model 
const User = mongoose.model('user', UserSchema);

//making this model available to the server
module.exports = User;



