import React,{useContext} from 'react'
import remove_icon from "../assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const CartMain = (props) => {
    const {  removeFromCart } = useContext(ShopContext);  
    
  return (
    <div>
     
  <div className="cart_body">
     <img className="cart_image" src={props.image} alt="" />
     <p>{props.name}</p>
    <p className="pxleft">${props.price}</p>
    <p className="pxleft">{props.quantity}</p>
    <p className="pxleft">${props.totalprice}</p>
      <img
      className="pxleft"
        style={{ cursor: "pointer" }}
        onClick={() => {removeFromCart(props.id);}}
        src={remove_icon} alt=""/>               
  </div>
  <hr />
 </div>
  )
}

export default CartMain
