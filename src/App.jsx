import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Category from './pages/Category'
import { ToastContainer } from 'react-toastify'

function App() {


  const token =  localStorage.getItem("accessToken")
  console.log('tt',token);

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
