import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from 'react-router-dom';

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, Setcompnay] = useState("");
 const params=useParams();
 const navigate=useNavigate()
 useEffect(()=>{
   getProductDetails()
 },[])
  const getProductDetails= async()=>{
    let result = await fetch(`http://localhost:8000/product/${params.id}`,{headers:{authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`}});
    result= await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    Setcompnay(result.company);

  }
  const updateProduct= async()=>
  {
    let result = await fetch(`http://localhost:8000/product/${params.id}`,{
      method: 'PUT',
      body:JSON.stringify({name,price,category,company}),
      headers:{'Content-Type': 'application/json',authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`}
    });
    if(result){
      navigate('/')
    };
   

  }
  return (
    <div className="Product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
       onChange={(e)=>{
        setName(e.target.value);
       }}
      />
  

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
       onChange={(e)=>{
        setPrice(e.target.value);
       }}
      />
  

      <input
        type="text"
        placeholder="Enter product Category"
        className="inputBox"
        value={category}
       onChange={(e)=>{
        setCategory(e.target.value)
       }}
      />
      

      <input
        type="text"
        placeholder="Enter product Company"
        className="inputBox"
        value={company}
       onChange={(e)=>{
        Setcompnay(e.target.value)
       }}
      />
      

      <button className="appButton" onClick={updateProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProducts;
