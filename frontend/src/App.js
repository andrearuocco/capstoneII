import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProfileContextProvider from './components/context/ProfileContextProvider'
import AuthPage from './components/view/AuthPage'

function App() {
  return (
    <ProfileContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </Router>
    </ProfileContextProvider>
  )
}

export default App


