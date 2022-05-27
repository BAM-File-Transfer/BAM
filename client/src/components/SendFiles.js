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

  // Helper function to create the torrent.
  createTorrent (accResponse) {
    // Files to send
    console.log(this.state.files);
    // Create torrent seed
    console.log(this.state.client)
    let returnMagnetLink = this.props.pressedSendButtonCallback;
    this.state.client.seed(this.state.files, function (torrent) {
      // console.log("Client is seeding:\n" + torrent.magnetURI);
      returnMagnetLink([torrent, accResponse]);
    });
  }

  /**
   * When the "Send Files" button is clicked, this function is called
   */
  sendButtonClicked = () => {
    let returnSpinnerFlag = this.props.spinnerCallback
    returnSpinnerFlag(true)
    let accResponse = false

    // Helper function to check IOS versions
    // https://stackoverflow.com/questions/8348139/detect-ios-version-less-than-5-with-javascript
    function iOSversion() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      }
    }
    // Only IOS 12.2 and later requires apps to ask for permission to use the Accelerometer sensor
    let ios_version = iOSversion()
    if( ios_version != undefined && ((ios_version[0] == 12 && ios_version[1] >= 2) || ios_version[0] >= 13) ) {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
          accResponse = true
        }
        this.createTorrent(accResponse);
      })
    } else if( /iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      accResponse = true
      this.createTorrent(accResponse);
    } else {
      this.createTorrent(accResponse);
    }
  }

  render() {
    return (
      <div className="chooseFile">
        <div className="fileListContainer" id="fileListContainer">
          <pre className="fileList" id="filelist"></pre>
        </div>

        {/* Makes it so that when you click "Send", it un-renders the "Choose Files" and "Send" Button */}
        {this.props.appState == "Choosing" && !this.props.showSpinner && (
          <div>
            {/* File Choosing */}
            <input
              title=" "
              type="file"
              className="button chooseFilesButton"
              id="files"
              onChange={this.handleFile}
              multiple
            />

            {/* Send Files button */}
            {/* Don't render "Send" Button if no files were chosen */}
            {this.state.files && this.state.files.length > 0 && !this.props.showSpinner && (
              <div>
                <button className="button" onClick = {this.sendButtonClicked}>
                  SEND FILES
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
  showSpinner: PropTypes.bool,
  pressedSendButtonCallback: PropTypes.func,
  spinnerCallback: PropTypes.func,
};

export default SendFiles;
