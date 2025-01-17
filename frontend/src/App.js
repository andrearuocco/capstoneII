import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';

function App() {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/* <Route element={<ProtectedRoutes />}>
          <Route path="/:id" element={<div className="fade-in-appjs"><EmployeeEdit /></div>} />
          <Route path="/:id/payments/:employeeDataId" element={<div className="fade-in-appjs"><PayEnvelope /></div>} />
        </Route> */}
      </Routes>

    </Router>
  )
}

export default App

