import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Navbar  from './components/navbar/Navbar'
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import News from './pages/news/News';
import Notes from './pages/notes/Notes';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />

       
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App