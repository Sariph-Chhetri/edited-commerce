import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

export const ShopContext = createContext(null);



const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const {user,setUser}  = useContext(UserContext);

  const fetchAllProducts = async () => {
    try {
      const { data: { allProducts } } = await axios.get(process.env.REACT_APP_SERVER + "/api/products");
      setAllProducts(allProducts);
    } catch (err) {
      console.log("Error fetching the products",err.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const addToCart = async( itemID, quantity) =>{

    const userId = user.User._id
   
    axios.put(process.env.REACT_APP_SERVER + "/api/updatecart",{userId, itemID, quantity })
    .then(({data:{cart}})=> {
      const updatedUser = {
        ...user,
        User: {
          ...user.User,
          cart: cart,
        },
      };
      setUser(updatedUser);
      
    }
      )
    .catch((error) =>{
      console.error("Error updating cart:", error.response?.data || error.message);
    })

  }

  const removeFromCart = async(itemID)=>{
    const userId = user.User._id

    axios.post(process.env.REACT_APP_SERVER + "/api/removecart",{userId, itemID })
    .then(({data:{cart}})=> {
      const updatedUser = {
        ...user,
        User: {
          ...user.User,
          cart: cart,
        },
      };
      setUser(updatedUser);
      
    }
      )
    .catch((error) =>{
      console.error("Error updating cart:", error.response?.data || error.message);
    })

  }

  const cartCount = () => {
    if(user){
      return user.User.cart.length
    }
    return 0;
  
  };

  const ContextValue = {
    all_products,
    addToCart,
    removeFromCart,
    cartCount,
  };
  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
