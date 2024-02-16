import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate();
   
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
  },[])

  const handeleLogin = async () => {
    let result = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if(result.auth){
        localStorage.setItem('user',JSON.stringify(result.user));
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate('/');
    }else{
        alert("Please enter  right details ")
    }
  };
  return (
    <div className="Login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="appButton" onClick={handeleLogin} type="button">
        Login{" "}
      </button>
    </div>
  );
};

export default Login;
