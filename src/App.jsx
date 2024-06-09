import React, { useEffect } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Category from './pages/Category'
import { ToastContainer } from 'react-toastify'

function App() {
const navigate = useNavigate();
  const token =  localStorage.getItem("accessToken")
useEffect(()=>{
  if(!token){
    navigate('/')
  }
},[])


  return (
    <>
     <Routes>
       
       <Route path="/" element={<Login />} />
       <Route path="/home" element={<Home />} />
       <Route path="/about" element={<Category />} />
       <Route path="*" element={<Home />} />
     </Routes>
     <ToastContainer />  
 
    </>
  )
}

export default App
