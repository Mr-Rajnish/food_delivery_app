import React, { useContext, useState } from 'react'
import './SignupPopup.css'
import { assets } from '../../assets/assets';
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';
const SignupPopup = ({setShowSignup}) => {
    const [currState,setCurrState]=useState("Signup")
   
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const {token,setToken,url}=useContext(StoreContext);
    
      const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
      }


      const onSignup=async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState==="Signup"){
          newUrl+="/api/user/register";
        }else{
          console.log("Signup failed")
        }
        const response= await axios.post(newUrl,data)
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowSignup(false);
        }
        else{
          alert(response.data.message)
        }
      }

      

  return (
    <div className='signup-popup'>
    <form onSubmit={onSignup} className="signup-popup-container">
      <div className="signup-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowSignup(false)} src={assets.cross_icon} alt="" />
      </div>
      <div className="signup-popup-inputs">
           <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password"  placeholder='Password' required/>
      </div>
      <button>Signup</button>
    </form>
  </div>
  )
}

export default SignupPopup