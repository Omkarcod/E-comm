import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img className="logo" src="https://logo.com/image-cdn/images/kts928pd/production/0089b7ae1ed394f041c5f7929e111c11e8eafe4d-424x421.png?w=1080&q=72" alt="logo"/>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link style={{fontSize:"20px",fontWeight:"bold"}} to="/">Products</Link>
          </li>
          <li>
            <Link style={{fontSize:"20px",fontWeight:"bold"}}  to="/add">Add products</Link>
          </li>
          <li>
            <Link style={{fontSize:"20px",fontWeight:"bold"}}  to="/update">Update products</Link>
          </li>

          <li>
            <Link style={{fontSize:"20px",fontWeight:"bold"}}  to="/profile">Profile</Link>
          </li>
         
          <li>
            <Link style={{fontSize:"20px",fontWeight:"bold"}}  to="/signup" onClick={Logout}>
              
              Logout ({JSON.parse(auth).name}) 
              
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right ">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
