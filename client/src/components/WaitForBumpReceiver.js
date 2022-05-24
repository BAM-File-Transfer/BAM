import React from 'react'
import '../styles/button.css'
import "../styles/containers.css"
import '../styles/waitforbump.css'
import '../styles/transferinprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { APIrecv } from "./ApiFetch";
import { useNavigate } from 'react-router-dom'
import FistsBumping from '../assets/FistsBumping.png'
import JSZip from "../../node_modules/jszip/dist/jszip";
import downloadIcon from "../assets/download.png";
import PropTypes from 'prop-types';

/*
    Waiting for Bump Receiver page

    Receiver renders this component after clicking Receive button on Home
    Currently, this component simulates the BAM action and starts receiving files
    Later, application should render TransferInProgress while downloading
    Then, render ReceiveFiles once done downloading
    But for now, this component contains all that functionality

*/
class WaitForBumpReceiver extends React.Component {
  componentDidMount() {
    // if the permission to access Accelerometer data is granted
    if (this.props.receiverAccPermission) {
      let isAccListenerActive = true
      window.addEventListener("devicemotion", (event) => {
        //let x_acceleration = event.acceleration.x;
        //let y_acceleration = event.acceleration.y;
        //let z_acceleration = event.acceleration.z;
        // if x axis acceleration is more than 20 m/s^2, a bump is detected
        if (isAccListenerActive && Math.abs(event.acceleration.x) > 15) {
          console.log(Math.abs(event.acceleration.x))
          // Deactivate the listener temporarily
          isAccListenerActive = false
          this.bamEvent()
          // After 5 seconds let the user be able to bump again
          setTimeout(function () {
            isAccListenerActive = true;
          }, 5000);
        }
      })
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      showFistBumpImage: true,
      showReceivedFiles: false,
      progress: 0,
    }
  }

  // (will be) Called when detected BAM action
  bamEvent = () => {
    let addedFiles = 0;
    var zip = new JSZip();
    const clientData = {
      name: "Superman",
      // magnetLink: "",
      coordinates: [Math.round(1000 * this.props.receiverLocationArr[0])/1000, Math.round(1000 * this.props.receiverLocationArr[1])/1000],
      date: Date.now(),
    };
    console.log("Receiver coordinates: " + clientData.coordinates)
    // // Check if the client has been created and created one if false
    // if(this.props.client == null){
    //     const { WebTorrent } = window
    //     this.setState({
    //         client: new WebTorrent()
    //       });
    // }

    // Display loading spinner (and progress)
    this.setState({
      showProgress: true
    })

    // API fetch call to grab magnet link from matching sender
    APIrecv(clientData).then((response) => {
      this.props.bumpCallback();

      // Log response
      console.log("Torrent ID: ", response.magnetLink);
      let torrentId = response.magnetLink;

      // https://webtorrent.io/docs
      // Start downloading torrent
      this.props.client.add(torrentId, function (torrent) {
        // Loop through each file in the torrent
        torrent.files.forEach(function (file) {

          // Set the parameters for the zip file
          zip.file(file.path, Blob, { base64: true });

          // Start zip into blob object for href download
          file.getBlob(function (err, blob) {
            if (err) throw err;
            addedFiles += 1;

            // Add file path to zip
            zip.file(file.path, blob);

            // Start the download when all files have been added
            if (addedFiles === torrent.files.length) {

              // Name the the file in the zip and start generating each file component
              if (torrent.files.length > 1) { zip = zip.folder(torrent.name); }
              zip.generateAsync({ type: "blob" }).then(function (blob) {
                // Start creating and editing html components
                let downloadList = document.getElementById("downloadList");
                let fileRow = document.createElement("div");
                fileRow.className = "downloadAllContainer";
                const url = URL.createObjectURL(blob);

                // Create Download All Files button html component
                const a = document.createElement("a");
                a.download = "downloaded_files";
                a.href = url;
                a.textContent = "Download All Files";
                a.className = "downloadAllButton";

                // Add components to html body
                fileRow.appendChild(a);
                downloadList.appendChild(fileRow);
                setTimeout(function () {
                  URL.revokeObjectURL(url);
                }, 30 * 1000);
              });
            }
          });

          // Start turning each individual file into blob object
          file.getBlobURL(function callback(err, url) {
            if (err) throw err;

            // Start creating and editing html components
            let downloadList = document.getElementById("downloadList");
            let fileRow = document.createElement("div");
            fileRow.className = "row fileRow";
            downloadList.appendChild(fileRow);

            // Create html component for file names
            var p = document.createElement("p");
            p.innerHTML = file.name;
            p.className = "col-10 fileNameContainer";

            // Create html component for individual download button
            var a = document.createElement("a");
            a.download = file.name;
            a.href = url;
            a.className = "col-4 downloadButton";

            // Insert download image into button
            var img = document.createElement("img");
            img.className = "downloadIcon";
            img.src = downloadIcon;
            a.appendChild(img);

            // Add components to html body
            fileRow.appendChild(p);
            fileRow.appendChild(a);
          });
        });
      });

      // Once torrent is done downloading, stop showing loading spinner/progress
    }).then(() => {
      this.setState({
        showProgress: false,
        showReceivedFiles: true,
        showFistBumpImage: false
      })
    })
  }

  cancelReceive = () => {
    useNavigate('/');
  }

  render() {
    return (
      <div className="App">
        {/* Fist bump image is the button. Simulates the bump */}
        {this.state.showFistBumpImage
          ? <div><button className="test-button" onClick={this.bamEvent}>
            <img src={FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic" />
          </button>

            <div className='fists-bumping-container'>
              <h1 className="text-style">
                <br />
                FIST BUMP THE DEVICES
                <br />
                TO INITIATE TRANSFER!
              </h1>
            </div></div>
          : <div
            id="downloadList"
            className="downloadListContainer container-fluid">
          </div>
        }

        {/* If currently downloading torrent, render loading spinner; else, render nothing */}
        {this.state.showProgress
          ? <div className="loader">Loading...</div>
          : null}
      </div>
    )
  }
}

// Declaring prop types
WaitForBumpReceiver.propTypes = {
  showProgress: PropTypes.bool,
  client: PropTypes.object,
  bumpCallback: PropTypes.func,
  receiverAccPermission: PropTypes.bool,
  receiverLocationArr: PropTypes.array,
};

export default WaitForBumpReceiver
