var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

// creating multiple users schema
var userSchema = new Schema ({
  
  firstName: string,
  surname: string,
  username: { type: String, required: true, unique: true},
  userId: { type: Number, required: true, unique: true},
  password: {type: String, required:true},
  age:number,
  dateOfBirth:number,

});




