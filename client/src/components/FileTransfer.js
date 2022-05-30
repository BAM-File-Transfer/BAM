import React from 'react'
import '../styles/button.css'
import "../styles/containers.css"
import '../styles/waitforbump.css'
import '../styles/transferinprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import JSZip from "../../node_modules/jszip/dist/jszip";
import downloadIcon from "../assets/download.png";
import PropTypes from 'prop-types';

/*
    File Transfer Component

    Receiver renders this component after clicking Receive button on Home
    This component starts receiving files after the bump has been detected
*/
class FileTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      showReceivedFiles: true,
    }
  }

  componentDidMount() {
    let addedFiles = 0;
    var zip = new JSZip();

    // Display loading spinner (and progress)
    this.setState({
      showSpinner: true
    })

    // Log magnet link
    let torrentId = this.props.magnetLink;
    console.log("Torrent ID: ", torrentId);

    // https://webtorrent.io/docs
    // Start downloading torrent
    let filetransfer = this;  // Scope workaround
    this.props.client.add(torrentId, function (torrent) {
      torrent.on('done', () =>{
        filetransfer.setState({
          showSpinner: false,
          showReceivedFiles: true
        })
        filetransfer.props.progressCallback()
      })

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
  }

  render() {
    return (
      <div className="App">
        {this.state.showReceivedFiles &&
            <div
              id="downloadList"
              className="downloadListContainer container-fluid">
            </div>
        }
      </div>
    )
  }
}

// Declaring prop types
FileTransfer.propTypes = {
  client: PropTypes.object,
  magnetLink: PropTypes.string,
  bumpCallback: PropTypes.func,
  progressCallback: PropTypes.func
};

export default FileTransfer
