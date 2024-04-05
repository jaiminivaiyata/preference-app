import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const AppRouter = () => {
  const accesstoken = localStorage.getItem("auth");

  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/dashboard" element={accesstoken ? <Dashboard/> : <Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
