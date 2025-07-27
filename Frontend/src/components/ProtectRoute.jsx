// src/components/Protect.jsx
import { Cookie } from 'lucide-react'
import React from 'react'
import { Navigate } from 'react-router-dom'

const Protect = ({ children }) => {
const token=localStorage.getItem('token') 



  
  if (!token) {
    return <Navigate to="/signup" replace />
  }

  return children
}

export default Protect
