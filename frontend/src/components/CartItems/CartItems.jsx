import React, { useContext } from "react";
import "../CartItems/CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import CartMain from "./CartMain";
import all_products from "../assets/all_product";

const CartItems = () => {
  const { cartItem ,getCartTotal } = useContext(ShopContext);  

  return (
    <div className="cart_items">
      <div className="cart_items_main">
        <h3>Products</h3>
        <h3>Title</h3>
        <h3>Price</h3>
        <h3>Quantity</h3>
        <h3>Total</h3>
        <h3>Remove</h3>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItem[e.id] > 0) {
          return  <CartMain key={e.id} name={e.name} image={e.image} id={e.id} price={e.new_price} quantity={cartItem[e.id]} 
          
          totalprice={e.new_price * cartItem[e.id]} />
        } else {
          return null;
        }
      })}
      <div className="cartItems_down">
        <div className="cartTotal">
          <h1>Cart Total</h1>
          <div className="cartTotal_item">
          <div className="cartTotal_items">
            <p>Subtotal</p>
            <p>${getCartTotal()}</p>
          </div><hr />
          <div className="cartTotal_items">
            <p>Shipping Fee</p>
            <p>free</p>
          </div>
  <hr />
          <div className="cartTotal_items">
            <h3>Total</h3>
            <h3>${getCartTotal()}</h3>
          </div>
          </div>
          <button>Proceed to checkout</button>
        </div>
        <div className="promocode">
          <p>If you have promo code, Enter it here</p>
          <div className="promocode_input">
          <input type="text" placeholder="promo-code"/>
          <button type="submit">Submit</button>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default CartItems;
