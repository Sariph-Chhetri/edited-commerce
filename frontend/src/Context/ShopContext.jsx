import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import toast from "react-hot-toast";

export const ShopContext = createContext(null);



const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const {user,setUser}  = useContext(UserContext);
  console.log("user:",user)
  const [cartItem, setCartData] = useState(user.User.cart); 
  console.log(user.User.cart)
 

  const fetchAllProducts = async () => {
    try {
      const { data: { allProducts } } = await axios.get(process.env.REACT_APP_SERVER + "/api/products");
      setAllProducts(allProducts);

      // ✅ Initialize cart after fetching products
      const initialCart = {};
      allProducts.forEach(product => {
        initialCart[product._id] = 0; // Set quantity to 0 for each product
      });
      setCartData(initialCart);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const updateCart = async( cartItem, itemID, quantity) =>{

    const userId = user.User._id
    if(!cartItem){
      // await createCart(itemID, quantity);
      return;
    }

    axios.put(process.env.REACT_APP_SERVER + "/api/updatecart",{userId, itemID, quantity })
    .then(({data:{cart}})=> {
      setUser((prevUser) => ({
        ...prevUser,
        User: {
          ...prevUser.User,  // Keep existing user details
          cart: cart, // Set the new cart value
        }
      }));
      
    }
      )
    .catch((error) =>{
      console.error("Error updating cart:", error.response?.data || error.message);
    })

  }
  
 
  const addToCart = (itemID, quantity, callback) => {
    setCartData((prevData) => ({
      ...prevData,
      [itemID]: (prevData[itemID] || 0) + quantity, // Ensure undefined values are handled
    }));
    callback(itemID);
  };

  const removeFromCart = (itemID) => {
    setCartData((prevData) => ({
      ...prevData,
      [itemID]: Math.max((prevData[itemID] || 0) - 1, 0), // Prevent negative values
    }));
  };

  const getCartTotal = () => {
    let cartTotal = 0;
   Object.entries(cartItem).forEach(([itemID, quantity])=>{
    if(quantity > 0){
      let addedProduct = all_products.find(product => product._id === itemID)
      if(addedProduct){
        cartTotal += addedProduct.new_price * quantity;
      }
    }
   })
    return cartTotal;
  };

  const cartCount = () => {
    let count = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        count += cartItem[item];
      }
    }
    return count;
  };

  const ContextValue = {
    all_products,
    addToCart,
    removeFromCart,
    cartItem,
    getCartTotal,
    cartCount,
    updateCart,
  };
  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
