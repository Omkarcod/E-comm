// import React, { useEffect, useState } from "react";
// import  { useNavigate} from 'react-router-dom';

// const Signup = () => {
//   const [name, setname] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const navigate=useNavigate();
  
//   useEffect(()=>{
//    const auth = localStorage.getItem('user');
//    if(auth){
//     navigate('/')
//    }
//   },[])

//   const collectData= async()=>{
//     console.log(name,email,password);
//     let result = await fetch('https://localhost:8000/register',{method:'POST',body:JSON.stringify({name,email,password}),headers:{'Content-Type':'application/json'}})
//     result=await result.json();
//     console.log(result);
//     localStorage.setItem("user", JSON.stringify(result));
//     navigate('/home');

//   }

//   return (
//     <div className="register">
//       <h1 style={{ marginLeft: "20px" }}>Register</h1>
//       <input
//         className="inputBox"
//         type="text"
//         placeholder="Enter name"
//         value={name}
//         onChange={(e) => setname(e.target.value)}
//       />
//       <input
//         className="inputBox"
//         type="text"
//         placeholder="Enter email"
//         value={email}
//         onChange={(e) => setemail(e.target.value)}
//       />
//       <input
//         className="inputBox"
//         type="password"
//         placeholder="type password"
//         value={password}
//         onChange={(e) => setpassword(e.target.value)}
//       />
//       <button onClick={collectData} className="appButton" type="button">
//         {" "}
//         Sign UP
//       </button>
//     </div>
//   );
// };

// export default Signup;

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const collectData = async () => {
    if (!name || !email || !password) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/login');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="register">
      <h1 style={{ marginLeft: "20px" }}>Register</h1>
      {error && <p className="error">{error}</p>}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Type password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={collectData} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
