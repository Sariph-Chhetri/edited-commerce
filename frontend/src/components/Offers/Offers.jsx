import React from 'react'
import exclusive_image from '../assets/exclusive_image.png'
import '../Offers/Offers.css'

const Offers = () => {
  return (
    <div className='offers'>
   
        <div className="offers_left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <div className="offer_button">Check Now</div>
        </div>
         <div className="offers_right">
            <img src={exclusive_image} alt="" />
         </div>
    </div>
  
  )
}

export default Offers
