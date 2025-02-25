import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AuthService from './service/AuthService'

const App = () => {
  return (

      <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/' element={<AuthService />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      </Routes>
  
  )
}

export default App