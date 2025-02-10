import React from 'react'
import arrow_icon from '../assets/arrow.png'
import hand_icon from "../assets/hand_icon.png"
import hero_img from '../assets/hero_image.png'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <p>NEW ARRIVALS ONLY</p>
        <div className="hero-hand-icon">
             <h1>new</h1>
        <img src={hand_icon} alt="" /></div>
       
        <h1>collections</h1>
        <h1>for everyone</h1>
        <div  className="hero-button"> 
            <div>Latest collections</div>
        <img  src={arrow_icon} alt="error" /> </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero
