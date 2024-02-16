const mongoose = require('mongoose');

const Dbconnection= async()=>{
   try {
    mongoose.connect("mongodb+srv://omkarthube1412:man@cluster0.pgr8bls.mongodb.net/");
    console.log("database connection established")
    
   } catch (error) {
    console.log(error,"error connecting to database");
   }
}

module.exports = Dbconnection();