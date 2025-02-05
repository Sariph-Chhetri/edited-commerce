import React, { useState } from 'react'
import "./CSS/LoginSignup.css"
import axios from 'axios'

const LoginSignup = () => {
  const [form , setForm] = useState("login")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
})

  const handleOnChange = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSignup = (e) =>{

    e.preventDefault();
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let {username, email, password} = formData;

    
    if( !username.length) {
         return alert( "Username is required")
     }
     if(username.length < 3){
        return alert("Username must be atleast 3 characters long!")
     }
    
     
     if(!email.length ){
         return alert("Enter your email.")
     }
     
     if (!emailRegex.test(email)){
         return alert( "Email is invalid.")
     }
     
     if(!password.length){
        return alert("Password is required")
     }
     if(password.length < 8){
        return alert("Password must be atleast 8 characters long!")
     }

     axios.post(process.env.REACT_APP_SERVER + "/api/signup", {username, email, password} )
    .then((data) =>{
        console.log(data)
    }) 
    .catch(err=>console.log(err))
    
  }

  return (
      <div className="form-modal">
    
    <div className="form-toggle">
        <button style={{background: form === 'login'?"#57b846":'white'}} className="login-toggle" onClick={()=>{setForm("login")}}>log in</button>
        <button style={{background: form === 'signup'? "#57b846":'white'}} className="signup-toggle" onClick={()=>{setForm("signup")}}>sign up</button>
    </div>

    {form === 'login' && <div className="login-form">
        <form >
            <input type="text" placeholder="Enter email or username"/>
            <input type="password" placeholder="Enter password"/>
            <button type="button" className="btn login">login</button>
            <div>Forgot account</div>
          

        </form>
    </div>}

    {form === 'signup' && <div className="signup-form">
        <form >
            <input type="email" name='email' value={formData.email} placeholder="Enter your email" onChange={handleOnChange}  required/>
            <input type="text" name='username' value={formData.username} placeholder="Choose username" onChange={handleOnChange}  required/>
            <input type="password" name='password' value={formData.password} placeholder="Create password" onChange={handleOnChange} required/>
            <button type="submit" className="btn signup" onClick={handleSignup} >create account</button>
           
        </form>
    </div>}

</div>

  )
}

export default LoginSignup
