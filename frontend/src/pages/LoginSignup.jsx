import React, { useState } from 'react'
import "./CSS/LoginSignup.css"

const LoginSignup = () => {
  const [form , setForm] = useState("login")
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
        <form>
            <input type="email" placeholder="Enter your email"/>
            <input type="text" placeholder="Choose username"/>
            <input type="password" placeholder="Create password"/>
            <button type="button" className="btn signup">create account</button>
            {/* <input type="checkbox" name="create_account" />
            <label htmlFor="create_account">Clicking create account means you are agreeing to our terms and conditions.</label>
           <hr/> */}
           
        </form>
    </div>}

</div>

  )
}

export default LoginSignup
