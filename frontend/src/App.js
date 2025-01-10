import React from 'react';
import './App.css';
import ProfileContextProvider from './components/ProfileContextProvider';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <ProfileContextProvider><BrowserRouter></BrowserRouter></ProfileContextProvider>
  )
}

export default App

