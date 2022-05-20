import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import PropTypes from 'prop-types';
import SendButton from './SendButton'

/**
 * ChooseFiles handles all the sending files logic. Honestly, it should
 * probably be renamed to SendFiles.
 */
class ChooseFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      isChoosingFiles: true,
      client: this.props.client,
    }
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

  finishChoosingFiles = () => {
    this.setState({ isChoosingFiles: false });
  } 

  render() {
    return (
        <div className="chooseFile">
            <div className="fileListContainer" id="fileListContainer">
                <pre className="fileList" id="filelist"></pre>
            </div>

            { // Makes it so that when you click "Send", it un-renders the "Choose Files" and "Send" Button
              this.state.isChoosingFiles && (
                <div>
                  <input type="file" className="button" id="files" onChange={this.handleFile} multiple ></input>
                  <SendButton files={this.state.files} parentClickHandler={this.finishChoosingFiles} client={this.state.client}/>
                </div>
              )
            }
        </div>
    )
  }
}

// DECLARING PROP TYPES
ChooseFiles.propTypes = {
  client: PropTypes.object,
  startedSendingCallback: PropTypes.function,
};

export default ChooseFiles;
