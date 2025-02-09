import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {

 const { login} = useContext(UserContext)
 let navigate = useNavigate();

  const [form, setForm] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    
    e.preventDefault();
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let { username, email, password } = formData;

    if (!username) {
      return toast.error("Username is required");
    }
    if (username.length < 3) {
      return toast.error("Username must be atleast 3 characters long!");
    }

    if (!email.length) {
      return toast.error("Enter your email.");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid.");
    }

    if (!password) {
      return toast.error("Password is required");
    }
    if (password.length < 8) {
      return toast.error("Password must be atleast 8 characters long!");
    }

    axios
      .post(process.env.REACT_APP_SERVER + "/api/signup", {
        username,
        email,
        password,
      })
      .then((data) => {
        toast.success("User created successfully!");

        setFormData({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      });
  };

  const handleLogin = (e) =>{
    e.preventDefault();

    let { username, password } = formData;

    if (!username) {
      return toast.error("Username is required");
    }

    if (!password) {
      return toast.error("Password is required");
    }
    if (password.length < 8) {
      return toast.error("Password must be atleast 8 characters long!");
    }

  login(username,password, navigate,()=>{
    setFormData({
      username: "",
      password: "",
    });
  });


  }

  return (
    <>
      <Toaster />
      <div className="form-modal">
        <div className="form-toggle">
          <button
            style={{ background: form === "login" ? "#57b846" : "white" }}
            className="login-toggle"
            onClick={() => {
              setForm("login");
            }}
          >
            log in
          </button>
          <button
            style={{ background: form === "signup" ? "#57b846" : "white" }}
            className="signup-toggle"
            onClick={() => {
              setForm("signup");
            }}
          >
            sign up
          </button>
        </div>

        {form === "login" && (
          <div className="login-form">
            <form>
              <input name="username" type="text" value={formData.username} placeholder="Enter username" onChange={handleOnChange} required />
              <input name="password" type="password" value={formData.password} placeholder="Enter password" onChange={handleOnChange} required />
              <button type="button" onClick={handleLogin} className="btn login">
                login
              </button>
              <div>Forgot account</div>
            </form>
          </div>
        )}

        {form === "signup" && (
          <div className="signup-form">
            <form>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Choose username"
                onChange={handleOnChange}
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Create password"
                onChange={handleOnChange}
                required
              />
              <button
                type="submit"
                className="btn signup"
                onClick={handleSignup}
              >
                create account
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginSignup;
