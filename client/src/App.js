import React from "react"
import './styles/App.css';
import About from './Components/About';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
      </Routes>
    </Router>

  );
}

export default App
