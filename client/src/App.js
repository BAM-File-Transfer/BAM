import logo from './logo.svg';
import './App.css';
import ChooseFiles from './Components/ChooseFiles';
import Receive from './Components/Receive';
import SuperheroName from './Components/SuperheroName';
import Header from './Components/Header';
import About from './Components/About';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
