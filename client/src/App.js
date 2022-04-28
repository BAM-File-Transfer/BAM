import React from "react"
import './styles/App.css';
import About from './components/About';
import Home from './components/Home';
import WaitForBump from './components/WaitForBump';
import SenderSuccess from './components/SenderSuccess';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/WaitForBump' element={<WaitForBump />} />
        <Route path='/SenderSuccess' element={<SenderSuccess />} />
      </Routes>
    </Router>

  );
}

export default App
