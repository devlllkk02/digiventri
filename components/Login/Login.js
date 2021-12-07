import React from "react";
import "./Login.scss";
import Logo from './Logo.png'
import { Link, Navigate } from "react-router-dom";
const Logout = () => {
    Navigate("/login");
};

function Login()  {
    return (
<>
<div class="wrapper">
    <div class="d-logo">
        <img src='DIGIVENTRI-Logo-02.png'/>
    </div>
    <div class="form">
      
        
       <div class="inputfield">
          
        <input type="email" placeholder="Email" class="input" / >
       </div> 
       <div class="inputfield">
     
          <input type="password" placeholder="Password" class="input"/>
       </div>  
       
       
        
     
      <div class="inputfield" >
        <input type="submit" value="Log In" class="btn"/>
      </div>
      <div class="separator">
        <div class="line"></div>
        <h4>OR</h4>
        <div class="line"></div>
      </div>

    
       <div class='g-sign-in-button'>
        <div class="content-wrapper">
            <div class='logo-wrapper'>
                <img src='https://developers.google.com/identity/images/g-logo.png'/>
            </div>
            <span class='text-container'>
          <span>Log In with Google</span>
        </span>
        </div>
    </div>
    

       <div class="account">
          Don't Have An Account?
       </div>

       <div class="login">
        <a href="">Sign Up</a>
    </div>

    </div>
</div>	
	
</>
);}