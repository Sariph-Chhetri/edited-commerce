import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import all_product from "../components/assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);

  const defaultCart = () => {
    let cart = {};

    for (let index = 0; index < all_products.length; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  const [cartItem, setCartData] = useState(defaultCart);
  

  const fetchAllProducts = async () => {
    await axios
      .get( process.env.REACT_APP_SERVER + "/api/products")
      .then(({data: {allProducts}}) => {
       setAllProducts(allProducts)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllProducts();
  }, []); 

  const addToCart = (itemID) => {
    setCartData((prevData) => ({
      ...prevData,
      [itemID]: prevData[itemID] + 1,
    }));
  };

  const removeFromCart = (itemID) => {
    setCartData((prevData) => ({
      ...prevData,
      [itemID]: prevData[itemID] - 1,
    }));
  };

  const getCartTotal = () => {
    let cartTotal = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const productInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        cartTotal += productInfo.new_price * cartItem[item];
      }
    }
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
  };
  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
