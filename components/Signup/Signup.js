import React from "react";
import "./Signup.scss";
import Logo from './Logo.png'
import { Link, Navigate } from "react-router-dom";
const Logout = () => {
    Navigate("/login");
};

function Signup()  {
    return (
<>
<div class="wrapper">
    <div class="d-logo">
        <img src={Logo} alt="DIGIVENTRI"/>
    </div>
    <div class="form">
       <div class="inputfield">
         
          <input type="text" placeholder="First Name" class="input"/>
       </div>  
        <div class="inputfield">
          
          <input type="text" placeholder="Last Name" class="input"/>
       </div> 
       <div class="inputfield">
          
        <input type="email" placeholder="Email" class="input"  />
       </div> 
       <div class="inputfield">
     
          <input type="password" placeholder="Password" class="input"/>
       </div>  
       <div class="inputfield">
     
        <input type="password" placeholder="Confirm Password" class="input"/>
     </div> 
       
        <div class="inputfield">
        <div class="btndiv">
          <button class="button"><p>Choose Image</p></button>
        </div>
        <div style="width: 21px;"></div>
          <input type="text" class="input" id="Imagebox"/>
       </div> 
      
     
      <div class="inputfield" >
        <input type="submit" value="SIGN UP" class="btn"/>
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
          <span>Sign Up with Google</span>
        </span>
        </div>
    </div>
    

       <div class="account">
           Already Have an Account?
       </div>

       <div class="login">
        <a href="">Login</a>
    </div>

    </div>
</div>
<div style="height: 45px;"></div>
</>
	);}
	
export default Signup;