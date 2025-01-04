import React from 'react'
import breadcrum_icon from "../assets/breadcrum_arrow.png"

import '../breadcrum/Breadcrum.css'

const Breadcrum = (props) => {
  return (
    <div className='breadcrum'>
        <span>HOME</span><img src={breadcrum_icon} alt="breadcrum error" /><span>SHOP</span><img src={breadcrum_icon} alt="breadcrum error" />
        <span>{props.product.category}</span><img src={breadcrum_icon} alt="breadcrum error" /><span>{props.product.name}</span>
    </div>
  )
}

export default Breadcrum
