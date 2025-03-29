import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProfileContextProvider from './components/context/ProfileContextProvider'
import AuthPage from './components/view/AuthPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ProfileContextProvider>
      <div className="app-wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </Router>
        {/* MODIFICHE 30 MARZO */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        {/* MODIFICHE 30 MARZO */}
      </div>
    </ProfileContextProvider >
  )
}

export default App


