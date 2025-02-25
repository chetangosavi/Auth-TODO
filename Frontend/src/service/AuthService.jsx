import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthService = () => {
  let token = localStorage.getItem('token')
  if(!token){
    return <Navigate to='/auth' />
  }
  return <div>
    <Outlet />
  </div>
}

export default AuthService