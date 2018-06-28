const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create cat schema and model
const CatSchema = newSchema({
  name:{
    type:String,
    required: [true, 'Name field is required'],
  },
  breed:{
    type:String
    
  },
  age:{
    type:numerical,
  },
  
  available:{
    type:boolean,
    default:false,
},
  sponsor:{
    type:boolean,
    deafult:false,
}
  
  //add in geo location
 //will give you the location of the cats
  
});
const Cat = mongoose.model('cat', CatSchema);
//makes it available to the server
module.exports = Cat;