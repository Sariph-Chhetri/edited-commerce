import React from 'react'
import {Link} from "react-router-dom"
import "../item/item.css"

const Item = (props) => {
  return (
    <div className='item'>
  
  <Link to={`/products/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt='error'></img></Link>
      
       <p>{props.item_name}</p>
       <div className="item_price">
        <div className='new_price'>${props.new_price}</div>
        <div className='old_price'>${props.old_price}</div>
       </div>
      
    </div>
  )
}

export default Item
