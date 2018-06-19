var express = require("express");
var app = express ();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

//connecting the app to mongoose
mongoose.connect ('mongodb://maykie:cheese123@ds261540.mlab.com:61540/meowster');
var db = mongoose.connection

//gets the requested page for you
app.get('/', function(req, res){
  res.send('hello you3');
  
  
});




app.get('/', (req, res) => res.send('Alls Good'));
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
    
  });