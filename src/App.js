// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './component/Layout'

// page imports:
import HomePage from './Pages/HomePage'
import LoginPage from './component/Login'
import RegisterPage from './component/Register'
import ProfilDetails from './component/ProfilDetails'
import ApiPage from './Pages/ApiPage'



function App() {
  return (
    <Router>
      <Routes>
        {/* root → redirect to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* pages without navbar */}
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* pages with navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profil" element={<ProfilDetails />} />
          <Route path="/apipage" element={<ApiPage />} />          
          

          {/* you can add more “pages” here */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
