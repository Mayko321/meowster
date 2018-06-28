const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create cat schema and model
const CatSchema = Schema({
  name:{
    type:String,
    required: [true, 'Name field is required'],
  },
  breed:{
    type:String
    
  },
  age:{
    type:Number,
  },
  
  available:{
    type:Boolean,
    default:false,
},
  sponsor:{
    type:Boolean,
    deafult:false,
}
  
  //add in geo location
 //will give you the location of the cats
  
});
const Cat = mongoose.model('cat', CatSchema);
//makes it available to the server
module.exports = Cat;