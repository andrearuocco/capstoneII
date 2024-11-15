import React from 'react';
import './App.css';
import Login from './components/Login'
import ProfileContextProvider from './components/context/ProfileContextProvider';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <ProfileContextProvider><BrowserRouter><Login/></BrowserRouter></ProfileContextProvider>
  )
}

export default App

