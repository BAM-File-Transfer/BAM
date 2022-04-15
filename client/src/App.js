import './styles/App.css';
import ChooseFiles from './Components/ChooseFiles';
import Receive from './Components/Receive';
import SuperheroName from './Components/SuperheroName';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <SuperheroName />
      <div>
        <ChooseFiles />
        <Receive />
      </div>
    </div>
  );
}

export default App;
