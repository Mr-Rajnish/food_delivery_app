import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import SignupPopup from './components/SignupPopup/SignupPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myOrders/MyOrders'

const App = () => {
  const[showLogin,setShowLogin]=useState(false);
  const[showSignup,setShowSignup]=useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {showSignup?<SignupPopup setShowSignup={setShowSignup}/>:<></>}
     <div className='app'>
     <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
     </Routes>
    </div>
    <Footer />
    </>
   
  )
}

export default App