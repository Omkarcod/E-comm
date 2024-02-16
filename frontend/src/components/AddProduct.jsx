import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, Setcompnay] = useState("");
  const [error,setError]=useState(false);
  const addProduct= async()=>
  
  {

    // checking any filed is empty or not
    if(!name || !price || !category || !company ){
        setError(true);
        return false;
    }
    // console.log(name,category,price,company)
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId);

    let  result =  await fetch('http://localhost:8000/addproduct',{
        method: 'POST',
        body:JSON.stringify({name,price,company,category,userId}),
        headers:{"content-type": "application/json",
        Authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      // },
    })
    result=result.json();
    console.log(result)

  }
  return (
    <div className="Product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
       onChange={(e)=>{
        setName(e.target.value);
       }}
      />
   {error && !name && <span className="invalid-input">Enter Valid Name</span>}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
       onChange={(e)=>{
        setPrice(e.target.value);
       }}
      />
       {error && !price && <span className="invalid-input">Enter Valid price</span>}

      <input
        type="text"
        placeholder="Enter product Category"
        className="inputBox"
        value={category}
       onChange={(e)=>{
        setCategory(e.target.value)
       }}
      />
       {error && !category && <span className="invalid-input">Enter Valid cateogry</span>}

      <input
        type="text"
        placeholder="Enter product Company"
        className="inputBox"
        value={company}
       onChange={(e)=>{
        Setcompnay(e.target.value)
       }}
      />
       {error && !company && <span className="invalid-input">Enter Valid company</span>}

      <button className="appButton" onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
