import React, { useContext } from "react";
import "../CartItems/CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import CartMain from "./CartMain";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { cartItem, getCartTotal, cartCount, all_products } = useContext(ShopContext);
  const cartFilteredItems = all_products.filter((product) => cartItem[product._id] > 0)

  return (
    cartCount() > 0 ? (
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
        { // ✅ Filter before mapping
          cartFilteredItems.map((e) => (
            <CartMain
              key={e._id}
              name={e.name}
              image={e.image}
              id={e._id}
              price={e.new_price}
              quantity={cartItem[e._id]}
              totalprice={e.new_price * cartItem[e._id]}
            />
          ))}
        <div className="cartItems_down">
          <div className="cartTotal">
            <h1>Cart Total</h1>
            <div className="cartTotal_item">
              <div className="cartTotal_items">
                <p>Subtotal</p>
                <p>${getCartTotal()}</p>
              </div>
              <hr />
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
            <p>If you have a promo code, enter it here</p>
            <div className="promocode_input">
              <input type="text" placeholder="promo-code" />
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"20px"}}>
      <div className="no_items_div" >No items in the Cart
      </div>
       <Link to={"/"}><button className="no_items_button">Continue Shopping</button></Link>
       </div>
    )
  );
}  

export default CartItems;
