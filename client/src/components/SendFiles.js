import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import PropTypes from 'prop-types';

/**
 * SendFiles handles all the sending files logic.
 */
class SendFiles extends React.Component {
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

  /**
   * When the "Send Files" button is clicked, this function is called
   */
  sendButtonClicked = () => {
    // FILES TO SEND
    console.log(this.state.files);
    // CREATE TORRENT SEED
    let returnMagnetLink = this.props.pressedSendButtonCallback;
    this.state.client.seed(this.state.files, function (torrent) {
      // console.log("Client is seeding:\n" + torrent.magnetURI);
      returnMagnetLink(torrent.magnetURI);
    });

    this.setState({ isChoosingFiles: false });
  }

  render() {
    return (
      <div className="chooseFile">
        <div className="fileListContainer" id="fileListContainer">
          <pre className="fileList" id="filelist"></pre>
        </div>

        {/* Makes it so that when you click "Send", it un-renders the "Choose Files" and "Send" Button */}
        {this.state.isChoosingFiles && (
          <div>

            {/* File Choosing */}
            <input
              type="file"
              className="button"
              id="files"
              onChange={this.handleFile}
              multiple
            />

            {/* Send Files button */}
            {/* Don't render "Send" Button if no files were chosen */}
            {this.state.files && this.state.files.length > 0 && (
              <div>
                <button className="button" onClick = {this.sendButtonClicked}>
                  Send Files
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    );
  }
}

// DECLARING PROP TYPES
SendFiles.propTypes = {
  client: PropTypes.object,
  pressedSendButtonCallback: PropTypes.func,
};

export default SendFiles;
