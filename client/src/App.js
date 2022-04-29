import React from "react"
import './styles/App.css';
import About from './components/About';
import Home from './components/Home';
import TransferInProgress from "./components/TransferInProgress";
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
