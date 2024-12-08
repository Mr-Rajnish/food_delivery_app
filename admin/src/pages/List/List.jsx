import React from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"
import { useEffect,useState} from 'react'
const List = () => {

  const[list,setList]=useState([]);
 const url='https://food-delivery-backend-grcm.onrender.com'

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
      
    }else{
      toast.error("Error");
    }
  }

  const removefood=async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if(response.data.success){
       toast.success(response.data.message)
    }else{
      toast.success("error")
    }

  }

  useEffect(()=>{
    fetchList();
  },[]);

  return (
    <div className='list add flex-col'>
        <h2><b>All Foods List</b></h2>
        <div className='list-table'>
          <div className='list-table-format title'>
            <h4><b>Image</b></h4>
            <h4><b>Name</b></h4>
            <h4><b>Category</b></h4>
            <h4><b>Price</b></h4>
            <h4><b>Action</b></h4>
          </div>
          {list.map((item, index) => {
            return (
                <div key={index} className='list-table-format'>
                <img className='list-image' src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p onClick={()=>removefood(item._id)} className='cursor'>X</p>
              </div>
               );
             })}

        </div>

    </div>
  )
}

export default List
