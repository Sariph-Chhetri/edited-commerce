import React from "react";
// import { ShopContext } from "../Context/ShopContext";
import CartItems from "../components/CartItems/CartItems";


const Cart = () => {
  // const { all_products, cartItem, removeFromCart} = useContext(ShopContext);
 
  return (
    <div>
       <CartItems />
    </div>
  );
};

export default Cart;
