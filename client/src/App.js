import React from "react"
import './styles/App.css';
import About from './Components/About';
import Home from './Components/Home';
import TransferInProgress from "./Components/TransferInProgress";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Progress' element={<TransferInProgress />} />
      </Routes>
    </Router>

  );
}

export default App
