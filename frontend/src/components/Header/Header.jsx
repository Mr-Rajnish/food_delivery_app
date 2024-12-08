import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
const Header = () => {
  return (
    <div className='header'>
    <div className="header-contents">
     <img className='header-image' src={assets.file6} alt=""  />
        {/* <h2>Order Your Fav Food From Here!</h2>
        <p>Choose from a diverse menu featuring a detectable array of dishes crafted with the finest ingredient and culinary expertise. Our mission is to  satisfy your cravings and elevate your dining experience, one delicious meal at a Time. </p>
        <button>View Menu</button> */}
    </div>
    </div>
  )
}

export default Header