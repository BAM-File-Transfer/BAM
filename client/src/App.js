import React from "react"
import './styles/App.css';
import About from './components/About';
import Home from './components/Home';
import WaitForBumpSender from './components/WaitForBumpSender';
import SenderSuccess from './components/SenderSuccess';
import ReceiverSuccess from './components/ReceiverSuccess'
import TransferInProgress from "./components/TransferInProgress";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WaitForBumpReceiver from "./components/WaitForBumpReceiver";

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/WaitForBumpSender' element={<WaitForBumpSender />} />
        <Route path='/WaitForBumpReceiver' element={<WaitForBumpReceiver />} />
        <Route path='/SenderSuccess' element={<SenderSuccess />} />
        <Route path='/ReceiverSuccess' element={<ReceiverSuccess />} />
        <Route path='/Progress' element={<TransferInProgress />} />
      </Routes>
    </Router>

  );
}

export default App
