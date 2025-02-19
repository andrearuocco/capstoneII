import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/view/AuthPage';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import PannelloControllo from './components/dashboard/PannelloControllo';

function App() {

  return (
    <ProfileContextProvider><Router>

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<div>18</div>} />
        {/* 
        <Route element={<ProtectedRoutes />}>
          <Route path="/:id" element={<div className="fade-in-appjs"><EmployeeEdit /></div>} />
          <Route path="/:id/payments/:employeeDataId" element={<div className="fade-in-appjs"><PayEnvelope /></div>} />
        </Route> 
        */}
      </Routes>

    </Router></ProfileContextProvider>
  )
  
}

export default App

