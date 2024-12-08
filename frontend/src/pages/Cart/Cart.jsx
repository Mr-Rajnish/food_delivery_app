


import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart ,getTotalCartAmount,url} = useContext(StoreContext);
   const navigate=useNavigate()
   // const url='http://localhost:4000';
  // Calculate the total price of the cart
  const getTotalPrice = () => {
    return food_list.reduce((total, item) => {
      return total + item.price * (cartItems[item._id] || 0);
    }, 0);
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Dish-image</p>
          <p>Dish-name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-item">
                <img src={url+"/images/"+item.image} alt={item.name} className="cart-item-image" />
                <p>{item.name}</p>
                <p>₹{(Number(item.price) || 0).toFixed(2)}</p>

                <p>{cartItems[item._id]}</p>
                <p>₹{(Number(item.price) * cartItems[item._id] || 0).toFixed(2)}</p>

               <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
              </div>
            );
          }
          return null; // Skip items not in the cart
        })}
        {Object.keys(cartItems).length === 0 && <p>Your cart is empty!</p>}
        <hr />
        </div>
        <div className="cart-bottom">
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
                <p>₹{getTotalCartAmount()===0?0:40}</p>
            </div>
            <div className='cart-total-details'>
               <b>Total</b>
               <b>₹{getTotalCartAmount()+(getTotalCartAmount()===0?0:40)}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed to CheckOut</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here!</p>
              <div className='cart-promocode-input'>
                <input type="text"  placeholder='promo code'/>
                <button>Submit</button>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    
  );
};

export default Cart;
