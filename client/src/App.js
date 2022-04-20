import './styles/App.css';
import ChooseFiles from './components/ChooseFiles';
import Receive from './components/Receive';
import SuperheroName from './components/SuperheroName';
import Header from './components/Header';
import About from './components/About';
import Home from './components/Home';
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
