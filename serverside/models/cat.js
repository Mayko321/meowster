const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    
//create geo location schema
const GeoSchema = Schema({
  type:{
    type:String, //tells us what type of data it is not the type of location
    default:"Point",
  },
  coordinates:{
    type:[Number],
    index:"2dsphere" //the type of map we would like to use
       
    
  },   
});
   

//create cat schema and model
const CatSchema = Schema({
  name:{
    type:String,
    required: [true, 'Name field is required'],
  },
  breed:{
    type:String
    
  },
  gender:{
    type:String
  },
  age:{
    type:Number,
  },
  
  charity:{
    type:String
  },
  //foreign key to identify the users cats
  user_email:{
    type:String  
},
  geometry:GeoSchema //add in geo location using geo json handler, giving location of the cats
  
                                         
                         
  
});
const Cat = mongoose.model('cat', CatSchema);
//makes it available to the server
module.exports = Cat;