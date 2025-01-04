import React from 'react'
import '../NewsLetter/NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='NewsLetter'>
        <h1>Get Exclusive Offer On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
      <div className="inputBox">
            <input type="email" placeholder='Your Email Id' name='email' />
            <button>Subscribe</button>
            </div>
    </div>
  )
}

export default NewsLetter
