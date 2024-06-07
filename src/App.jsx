import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Category from './pages/Category'

function App() {


  return (
    <>
     <Routes>
       
       <Route path="/" element={<Login />} />
       <Route path="/home" element={<Home />} />
       <Route path="/about" element={<Category />} />
       <Route path="*" element={<Home />} />
     </Routes>
    </>
  )
}

export default App
