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
      appState: this.props.appState,
      client: this.props.client,
    }
  }

  // Populates pre component with file names
  handleFile = (e) => {
    // Creating html components
    e.preventDefault()
    const fileListContainer = document.getElementById('fileListContainer')
    const fileList = document.getElementById('filelist')
    const userFiles = document.getElementById('files').files

    // Loop through userFiles and set html data to each file name
    fileList.innerHTML = ''
    for (let i = 0; i < userFiles.length; i++) {
      fileList.innerHTML += userFiles[i].name + '\n\n'
    }

    // If the list is empty, display nothing
    // Else, display the html components
    if (fileList.innerHTML === '' || fileList.innerHTML === null) {
      fileList.style.display = 'none'
      fileListContainer.style.display = 'none'
    } else {
      fileList.style.display = 'block'
      fileListContainer.style.display = 'flex'
    }

    this.setState({
      files: userFiles
    })
  }

  /**
   * When the "Send Files" button is clicked, this function is called
   */
  sendButtonClicked = () => {
    // Files to send
    console.log(this.state.files);
    // Create torrent seed
    console.log(this.state.client)
    let returnMagnetLink = this.props.pressedSendButtonCallback;
    this.state.client.seed(this.state.files, function (torrent) {
      // console.log("Client is seeding:\n" + torrent.magnetURI);
      returnMagnetLink(torrent);
    });
  }

  render() {
    return (
      <div className="chooseFile">
        <div className="fileListContainer" id="fileListContainer">
          <pre className="fileList" id="filelist"></pre>
        </div>

        {/* Makes it so that when you click "Send", it un-renders the "Choose Files" and "Send" Button */}
        {this.state.appState == "Choosing" && (
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

// Declaring prop types
SendFiles.propTypes = {
  client: PropTypes.object,
  appState: PropTypes.string,
  pressedSendButtonCallback: PropTypes.func,
};

export default SendFiles;
