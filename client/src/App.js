import React from "react"
import './styles/App.css';
import About from './Components/About';
import Home from './Components/Home';
import WaitForBump from './Components/WaitForBump';
import SenderSuccess from './Components/SenderSuccess';
import ReceiverSuccess from './Components/ReceiverSuccess'
import TransferInProgress from "./Components/TransferInProgress";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/WaitForBump' element={<WaitForBump />} />
        <Route path='/SenderSuccess' element={<SenderSuccess />} />
        <Route path='/ReceiverSuccess' element={<ReceiverSuccess />} />
        <Route path='/Progress' element={<TransferInProgress />} />
      </Routes>
    </Router>

  );
}

export default App
