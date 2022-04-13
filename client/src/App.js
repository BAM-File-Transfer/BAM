import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from '../node_modules/react-bootstrap/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label>BAM!</label>
        <div>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Control className="btn_file_select" type="file" multiple />
        </Form.Group>
        </div>
      </header>
    </div>
  );
}

export default App;
