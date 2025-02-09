import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import "./Navbar.css";
import { data, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
 

  // Get the current location
  const location = useLocation();

  // Initialize state from localStorage or default to 'shop'
  const savedMenu = localStorage.getItem("menu") || "shop";
  const [menu, setMenu] = useState(savedMenu);

  const { cartCount } = useContext(ShopContext);

  //Logout function
  const hanldeLogout = () =>{

    axios.post(process.env.REACT_APP_SERVER + ("/api/logout"),{withCredentials: true})
    .then( () => {
      toast.success("Logged Out successfully");
      setUser(null);
      localStorage.removeItem("userData");
    })

  }


  // Reset menu state to 'shop' when on the home route '/'
  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("shop");
    }
  }, [location.pathname]);
  // dependency array --> if any of the  dependency array is changed then it runs the useEffect callback function

  // Save the menu state to localStorage whenever it changes
  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.setItem("menu", menu);
    }
  }, [menu, location.pathname]);

  return (
    <div className="navbar">
      <div className="navlogo">
        <Link to={"/"}>
          <img src={logo} alt="nav logo" />
        </Link>
        <h1>SHOPPER</h1>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            Shop {menu === "shop" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => setMenu("men")}>
          <Link style={{ textDecoration: "none" }} to={"/men"}>
            Men {menu === "men" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => setMenu("women")}>
          <Link style={{ textDecoration: "none" }} to={"/women"}>
            Women {menu === "women" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to={"/kids"}>
            Kids {menu === "kids" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {!user ? (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        ) : (<>
        <p>Hi, <span style={{textTransform:"capitalize"}}>{user.User.username}</span></p>
            <button style={{color:"red"}} onClick={hanldeLogout}>Logout</button>
            </>
        )}
        <Link to={"/cart"}>
          <img src={cart_icon} alt="cart_icon" />
        </Link>
        <div className="nav-cart-count">{cartCount()}</div>
      </div>
    </div>
  );
};

export default Navbar;
