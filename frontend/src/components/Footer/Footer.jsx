import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
 import pinterest from '../assets/pintester_icon.png'
 import whatasapp from "../assets/whatsapp_icon.png"
 import instagram from "../assets/instagram_icon.png"
 import "../Footer/Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_top">
      <Link to={'/'}><img src={logo} alt="footer logo" /></Link>
      <h1>SHOPPER</h1>
      </div>
      <ul className="footer_list">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="social_media_icons">
        <div><img  src={pinterest} alt="" /></div>
        <div><img src={whatasapp} alt="" /></div>
        <div><img src={instagram} alt="" /></div>
      </div>
      <hr/>
      <p>Copyright @ {new Date().getFullYear()} - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
