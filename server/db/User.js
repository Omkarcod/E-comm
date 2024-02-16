const mongoose=require('mongoose');


const Userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});


let users=mongoose.model('products',Userschema);

module.exports = users;

