
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext=createContext(null);
const StoreContextProvider=(props)=>{

    const url='http://localhost:4000';
    const [token,setToken]=useState("");
    const [cartItems,setCartItems]=useState({});  
  
    //for getting foodlist from database to render in the frontend
    const[food_list,setFoodList]=useState([]);


    const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    const loadCartData=async(token)=>{
        const response=await axios.post(url+"/api/cart/get" ,{},{headers:{token}});
        setCartItems(response.data.cartData);
        
    }
     


    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
             }
        }
        loadData(); 
    },[]);


    const addtoCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async(itemId) => {
        // setCartItems((prev) => {
        //     const updatedCart = { ...prev };
    
        //     if (updatedCart[itemId] > 1) {
        //         // Decrement quantity if more than 1
        //         updatedCart[itemId] -= 1;
        //     } else {
        //         // Remove the item if quantity is 1
        //         delete updatedCart[itemId];
        //     }
    
        //     return updatedCart;
        // });
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };
    
    
    const getTotalCartAmount=()=>{
        let totalAmount=0;
     
        for (const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item);
                totalAmount+=iteminfo.price*cartItems[item];
             
            }
        }
        return totalAmount;
    }

    const countcartItem=()=>{
        let totalAmount=0;
         let count=0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id===item);
                totalAmount+=iteminfo.price*cartItems[item];
                count++;
            }
        }
        return count;
    }

    
  
    const contextValue={
     food_list,
     url,
     cartItems,
     setCartItems,
     addtoCart,
     removeFromCart,
     getTotalCartAmount,
     token,
     setToken,
     countcartItem,
    
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;