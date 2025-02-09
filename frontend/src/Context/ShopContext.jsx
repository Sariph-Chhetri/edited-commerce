import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const [cartItem, setCartData] = useState({}); // Start with an empty object

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
  console.log(cartItem)

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const addToCart = (itemID) => {
    setCartData((prevData) => ({
      ...prevData,
      [itemID]: (prevData[itemID] || 0) + 1, // Ensure undefined values are handled
    }));
  };

  const removeFromCart = (itemID) => {
    setCartData((prevData) => ({
      ...prevData,
      [itemID]: Math.max((prevData[itemID] || 0) - 1, 0), // Prevent negative values
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
