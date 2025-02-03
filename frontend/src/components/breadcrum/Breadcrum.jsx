import React from 'react'
import breadcrum_icon from "../assets/breadcrum_arrow.png"

import '../breadcrum/Breadcrum.css'
import { Link } from 'react-router-dom'

const Breadcrum = (props) => {
  return (
    <div className='breadcrum'>
        <Link style={{ textDecoration: "none", color:"black" }} to={"/"}><span>HOME</span></Link><img src={breadcrum_icon} alt="breadcrum error" /><Link style={{ textDecoration: "none", color:"black" }} to={"/"}><span>SHOP</span></Link><img src={breadcrum_icon} alt="breadcrum error" />
       <Link style={{ textDecoration: "none", color:"black" }} to={`/${props.product.category}`}> <span>{props.product.category}</span></Link><img src={breadcrum_icon} alt="breadcrum error" /><span>{props.product.name}</span>
    </div>
  )
}

export default Breadcrum
