import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProfileContextProvider from './components/context/ProfileContextProvider'
import AuthPage from './components/view/AuthPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PannelloControllo from './components/dashboard/PannelloControllo'

function App() {
  return (
    <ProfileContextProvider>
      {/* div a riga 16 che racchiude AuthPage_05APRSERA */}
        <Router>
          <Routes>
           <Route path="/" element={<div className="app-wrapper"><AuthPage/></div>} /> {/* _05APRS. */}
            <Route path="/dashboard" element={<PannelloControllo/>} />
          </Routes>
        </Router>
        {/* MODIFICHE 30 MARZO */}
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
        {/* MODIFICHE 30 MARZO */}
      {/* div a riga 16 che racchiude AuthPage_05APRSERA */}
    </ProfileContextProvider >
  )
}

export default App


