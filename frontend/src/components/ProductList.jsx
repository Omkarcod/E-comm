import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts= async()=>{
        let result =  await fetch('http://localhost:8000/products',{headers:{authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`}}
        );
        result= await result.json();
        setProducts(result);
    }
    // console.log(products)
    const deleteProduct= async(id)=>{
        let result = await fetch(`http://localhost:8000/product/${id}`,{method: 'DELETE',headers:{authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`}});

        result=result.json();
        if(result){
            alert("Product deleted")
            getProducts();
        }

    }
    const getSearch = async(e)=>{
        
       let key  = e.target.value;
       if(key){ 
        // console.log(key);
        let result = await fetch(`http://localhost:8000/search/${key}`,{headers:{authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`}});
        result =  await result.json();
   if(result){
     setProducts(result);
   }}else{
    getProducts();
   }
      

    

    }
  return (
    <div className='product-list'>
        <h1>ProductList</h1>
        <input type='text ' placeholder='Search products' className='Search-product-box' onChange={getSearch}/>
        <ul>
            <li> S.No</li>
            <li>Name</li>
            <li>Price</li>
            <li> Category</li>
            <li>opration</li>
        </ul>
        {
         products.length>0 ?   products.map((item,index)=>(
                <ul key={item._id}>
                <li> {index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li> {item.category}</li>
                <li><button style={{backgroundColor:'red',color:"white"}} onClick={()=>deleteProduct(item._id)}> delete</button>
             <Link to={'/update/'+item._id}> <button style={{backgroundColor:"blue",color:"white"}}>update</button> </Link> 
                
                </li>
                
            </ul> 
            )):<h1>No result found</h1>
        }
    </div>
  )
}

export default ProductList