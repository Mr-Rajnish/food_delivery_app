import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for toast
const PlaceOrder = () => {


const {getTotalCartAmount,token,food_list,cartItems,setCartItems,url}=useContext(StoreContext);


const [data,setData]=useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""
})

const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery"); // New state for payment method


const onChangeHandler=(event)=>{
   const name=event.target.name;
   const value=event.target.value;
   setData(data=>({...data,[name]:value}))
}

const handlePaymentMethodChange = (event) => {
  setPaymentMethod(event.target.value);  // Update payment method when radio button is changed
};

const clearCart = () => {
  setCartItems({}); // Reset cart items to an empty object
};

  const placeorder=async(event)=>{
  event.preventDefault();
  let orderItems=[];
   food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)
      }
   })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+40,
    }

    if (paymentMethod === "cashOnDelivery") {
      // Place order and navigate to My Orders with success toast
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
         // Show success toast
         clearCart();
        navigate("/myorders"); 
        toast.success(response.data.message)
         // Navigate to "My Orders" page
      } else {
        alert("Error placing order");
      }
    } else if (paymentMethod === "stripe") {
      // For Stripe, proceed to Stripe payment page
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to Stripe payment gateway
      } else {
        alert("Error placing order");
      }
    }
  };

  const navigate= useNavigate();

  useEffect(()=>{
        if(!token){
        navigate('/cart');
        } 
        else if(getTotalCartAmount()===0){
          navigate('/cart');
        }
  },[token])

  return (
     <form className='place-order' onSubmit={placeorder}>
       
      <div className="place-order-left">
     <p className="title">Deivery Information</p>
     <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text"  placeholder='Last Name'/>
     </div>

     <input required name='email'  onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
     <input required name='street' onChange={onChangeHandler} value={data.street} type="text"  placeholder='Street' />
     <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text"  placeholder='State'/>
     </div>
     <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text"  placeholder='Country'/>
     </div>
     <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone No'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          {/* <h3>Total Price: ₹{getTotalPrice().toFixed(2)}</h3> */}
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount()===0?0:40}</p>
            </div>
            <div className='cart-total-details'>
               <b>Total</b>
               <b>₹{getTotalCartAmount()+(getTotalCartAmount()===0?0:40)}</b>
            </div>
          </div>
          <div>
            <h2>Payment Method</h2>
            <div className='cash-on-delivery'>
              <input style={{marginRight:"9px"}}
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cashOnDelivery" >Cash on Delivery</label>
            </div>
            <div className='stripe-payment'>
              <input style={{marginRight:"9px"}}
                type="radio"
                id="stripe"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="stripe">Stripe (Credit/Debit)</label>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
          </div>
      </div>
     </form>
  )
}

export default PlaceOrder