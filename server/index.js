const express = require("express");
const db = require("./db/config");
const mongoose = require("mongoose");

const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const jwtKey='e-comm';

app.use(express.json());
// let db=database;
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  // res.send(result);
  // console.log(result);
  jwt.sign({result},jwtKey,{expiresIn:'2 h'},(err,token)=>{
    if(err){
      res.send({result:"something went wrong"});
    }
    else{
      res.send({result,auth:token});
    }
    
   })
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
       jwt.sign({user},jwtKey,{expiresIn:'2 h'},(err,token)=>{
        if(err){
          res.send({esult:"something went wrong"});
        }
        else{
          res.send({user,auth:token});
        }
        
       })
    } else {
      res.send({ result: "No user Found" });
    }
  } else {
    res.send({ result: "No user Found" });
  }
});
app.post('/addproduct',verifyToken, async(req,res)=>{
    let product = new Product(req.body)
    let result= await product.save();
    res.send(result);
})

app.get('/products',verifyToken, async (req, res) => {
  let products = await Product.find();
  if(products.length>0){
    res.send(products)
  }else{

    res.send({result:"no data found"});
  }
})

app.delete('/product/:id',verifyToken,async(req,res)=>{
 let result = await Product.deleteOne({_id:req.params.id});
 res.send(result);
})

app.get('/product/:id',verifyToken,async(req,res)=>{
  let result = await Product.findOne({_id:req.params.id});
 if(result){
  res.send(result);
 }
 else{
  res.send("Product not found")
 }
}
)

app.put('/product/:id',verifyToken,async(req,res)=>{
  let result= await Product.updateOne({_id:req.params.id},{$set:req.body});
  res.send(result);
})

// search api

app.get('/search/:key',verifyToken,async(req,res)=>{
  let result = await Product.find({
    $or:[
      {name:{$regex:req.params.key}},
      {
        price:{$regex:req.params.key}
      }
    ]
  })
  res.send(result);
})

// function verifyToken(req,res,next){
//   console.log(req.headers['authorization']);
//   let token=req.headers['authorization'];
//   if(token){
//     token = token.split(' ')[1];
//     console.log(token);

//     jwt.verify(token, jwtKey, (err, valid) => {
//       if (err) {
//         res.send("Please provide a valid token");
//       } else {
//         next();
//       }
//     });
   
//   }
//   else{
//     res.send("plsease provide a token ")
//   }

// }

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send("Please provide a token");
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send("Invalid token format");
  }

  jwt.verify(tokenParts[1], jwtKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).send("Invalid or expired token");
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
}

app.listen(8000, () => {
  console.log("Server running successfully");
});
