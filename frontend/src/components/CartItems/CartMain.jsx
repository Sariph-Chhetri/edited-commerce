import React,{useContext} from 'react'
import remove_icon from "../assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from '../../Context/userContext';
import toast, { Toaster } from 'react-hot-toast';

const CartMain = (props) => {
    const {  removeFromCart } = useContext(ShopContext);  
    const {user} = useContext(UserContext);

 

    const handleRemoveCart = ()=>{
     if(user){
      removeFromCart(props.id)
      toast.success("Removed from cart")
     }
     else{
      toast.error("You need to have an account to remove item") 
     }
          
    }
  return (
    <div>
     <Toaster />
  <div className="cart_body">
     <img className="cart_image" src={props.image} alt="" />
     <p>{props.name}</p>
    <p className="pxleft">${props.price}</p>
    <p className="pxleft">{props.quantity}</p>
    <p className="pxleft">${props.totalprice}</p>
      <img
      className="pxleft"
        style={{ cursor: "pointer" }}
        onClick={handleRemoveCart}
        src={remove_icon} alt=""/>               
  </div>
  <hr />
 </div>
  )
}

export default CartMain
