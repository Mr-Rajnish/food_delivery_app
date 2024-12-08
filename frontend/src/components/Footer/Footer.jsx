import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='footer-logo-img' src={assets.logo} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, et repudiandae. Minus possimus earum neque excepturi. Ad nulla repudiandae quidem?</p>
                 <div className="footer-social-icon">
                     <img src={assets.facebook_icon} alt="" />
                     <img src={assets.twitter_icon} alt="" />
                     <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-9026-774-443</li>
                        <li>rajnish@gmail.com</li>
                    </ul>
            </div>
           
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @Rajnish-Restro.com - All Right Reserved(Rajnish).</p>
    </div>
  )
}

export default Footer