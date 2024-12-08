import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
         <p>For Better Experience Download <br/> Rajnish Restro App</p>
         <div className='app-download-platforms'>
            <div>
                <a href="https://play.google.com/store/apps/details?id=in.swiggy.android&hl=en_IN&pli=1">
                <img src={assets.play_store}   alt="" />
                </a>
            
            </div>
          <div>
            <a href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920  ">
                    <img src={assets.app_store} alt="" />
            </a>
          </div>
         
         </div>
    </div>
  )
}

export default AppDownload