import React from 'react'
import '../styles/button.css'
import "../styles/containers.css";
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { APIrecv } from "./ApiFetch";
import { useNavigate } from 'react-router-dom'
import FistsBumping from '../assets/FistsBumping.png'
import JSZip from "../../node_modules/jszip/dist/jszip";
import downloadIcon from "../assets/download.png";
import PropTypes from 'prop-types';
/*
\
*/
class WaitForBumpReceiver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: this.props.client,
        }
    }

    bamEvent = () => {
        var zip = new JSZip();
        let addedFiles = 0;
        const clientData = {
            name: "Superman",
            // magnetLink: "",
            coordinates: [115, 115],
            date: Date.now(),
        };
        if(this.state.client == null){
            const { WebTorrent } = window
            this.setState({
                client: new WebTorrent()
              });
        }
        APIrecv(clientData).then((response) => {
            console.log("Torrent ID: ", response.magnetLink);
      
            let torrentId = response.magnetLink;
            // https://webtorrent.io/docs
            console.log(this.state.client)
            this.state.client.add(torrentId, function (torrent) {
              torrent.files.forEach(function (file) {
                zip.file(file.path, Blob, { base64: true });
                // temporary code. will be replaced with updating Parent Component torr state
                file.getBlob(function (err, blob) {
                  addedFiles += 1;
                  if (err) throw err;
      
                  // add file to zip
                  zip.file(file.path, blob);
      
                  // start the download when all files have been added
                  if (addedFiles === torrent.files.length) {
                    if (torrent.files.length > 1) {
                      // generate the zip relative to the torrent folder
                      zip = zip.folder(torrent.name);
                    }
                    zip.generateAsync({ type: "blob" }).then(function (blob) {
                      let downloadList = document.getElementById("downloadList");
                      let fileRow = document.createElement("div");
                      fileRow.className = "downloadAllContainer";
                      downloadList.appendChild(fileRow);
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.download = "downloaded_files";
                      a.href = url;
                      a.textContent = "Download All Files";
                      a.className = "downloadAllButton";
                      fileRow.appendChild(a);
                      setTimeout(function () {
                        URL.revokeObjectURL(url);
                      }, 30 * 1000);
                    });
                  }
                });
                file.getBlobURL(function callback(err, url) {
                  if (err) throw err;
                  // Create the list
                  let downloadList = document.getElementById("downloadList");
                  let fileRow = document.createElement("div");
                  fileRow.className = "row fileRow";
                  downloadList.appendChild(fileRow);
      
                  var p = document.createElement("p");
                  p.innerHTML = file.name;
                  p.className = "col-10 fileNameContainer";
      
                  var a = document.createElement("a");
                  a.download = file.name;
                  a.href = url;
                  a.className = "col-4 downloadButton";
      
                  var img = document.createElement("img");
                  img.className = "downloadIcon";
                  img.src = downloadIcon;
                  a.appendChild(img);
      
                  fileRow.appendChild(p);
                  fileRow.appendChild(a);
                });
              });
            });
          });
    }

    cancelReceive = () => {
        useNavigate('/');
    }

    render(){ return (
        <div className="App">
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
            <div
                id="downloadList"
                className="downloadListContainer container-fluid"
            ></div>
            <button className = "red-button-bottom" onClick={this.cancelReceive}>CANCEL</button>
            </div>
    )}
}

// Declaring prop types
WaitForBumpReceiver.propTypes = {
    client: PropTypes.object,
    bumpCallback: PropTypes.func
};

export default WaitForBumpReceiver