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
    constructor(props) {
        super(props);
        this.state = {
            client: this.props.client,
            showProgress: false
        }
    }

    // (will be) Called when detected BAM action
    bamEvent = () => {
        let addedFiles = 0;
        var zip = new JSZip();
        const clientData = {
            name: "Superman",
            // magnetLink: "",
            coordinates: this.props.receiverLocationArr,
            date: Date.now(),
        };

        // Check if the client has been created and created one if false
        if(this.state.client == null){
            const { WebTorrent } = window
            this.setState({
                client: new WebTorrent()
              });
        }

        // Display loading spinner (and progress)
        this.setState({
            showProgress: true
        })

        // API fetch call to grab magnet link from matching sender
        APIrecv(clientData).then((response) => {

            // Log response
            console.log("Torrent ID: ", response.magnetLink);
            let torrentId = response.magnetLink;

            // https://webtorrent.io/docs
            // Start downloading torrent
            this.state.client.add(torrentId, function (torrent) {

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
                    if (torrent.files.length > 1) { zip = zip.folder(torrent.name);}
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
            setTimeout(function () {}, 30 * 1000);
            this.setState({
                showProgress: false
            })
          })
    }

    cancelReceive = () => {
        useNavigate('/');
    }

    render(){ return (
        <div className="App">
            {/* Fist bump image is the button. Simulates the bump */}
            <button className = "test-button" onClick={this.bamEvent}>
              <img src = {FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic"/>
            </button>

            <div className='fists-bumping-container'>
                <h1 className="text-style">
                    <br/>
                    FIST BUMP THE DEVICES
                    <br/>
                    TO INITIATE TRANSFER!
                </h1>
            </div>

            {/* If currently downloading torrent, render loading spinner; else, render nothing */}
            { this.state.showProgress
            ? <div className="loader">Loading...</div>
            : null}

            {/* Container for the downloaded files */}
            <div
                id="downloadList"
                className="downloadListContainer container-fluid">
            </div>

            {/* Cancel button (currently does not work) */}
            <button className = "red-button-bottom" onClick={this.cancelReceive}>CANCEL</button>
            </div>
    )}
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
