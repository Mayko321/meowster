var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

// creating multiple users schema
var User = new Schema ({
  
  firstName: String,
  surname: String,
  username: { type: String, required: true, unique: true},
  userId: { type: Number, required: true, unique: true},
  password: {type: String, required:true},
  age:Number,
  dateOfBirth:Number,

});

//making this model available to our users.
module.exports = User;



