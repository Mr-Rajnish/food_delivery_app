import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import { ToastContainer,toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    
  return (
    <div>
      <ToastContainer/>
     <Navbar/>
     
     <hr />
     <div className="app-content">
       <Sidebar/>
       <Routes>
         <Route path="/add" element={<Add/>}/>
         <Route path="/list" element={<List/>}/>
         <Route path="/orders" element={<Orders/>}/>
       </Routes>
     </div>
    </div>
  )
}

export default App