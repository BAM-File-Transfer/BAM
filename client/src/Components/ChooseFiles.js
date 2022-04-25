import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import SendButton from './SendButton'

class ChooseFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {files: null}
  }
  
  // Populates pre component with file names
  handleFile = (e) => {
    const fileListContainer = document.getElementById('fileListContainer')
    const fileList = document.getElementById('filelist')
    const userFiles = document.getElementById('files').files
  
    e.preventDefault()
    fileList.innerHTML = ''
    for (let i = 0; i < userFiles.length; i++) {
      fileList.innerHTML += userFiles[i].name + '\n\n'
    }
    if (fileList.innerHTML === '' || fileList.innerHTML === null) {
      fileList.style.display = 'none'
      fileListContainer.style.display = 'none'
    } else {
      fileList.style.display = 'block'
      fileListContainer.style.display = 'flex'
    }

    this.setState({
      files: userFiles
    });
  }

  render() {
    return (
        <div className="chooseFile">
            <input type="file" className="button" id="files" onChange={this.handleFile} multiple ></input>
            <div className="fileListContainer" id="fileListContainer">
                <pre className="fileList" id="filelist"></pre>
            </div>
            <SendButton files={this.state.files}/>
        </div>
    )
  }
}

export default ChooseFiles
