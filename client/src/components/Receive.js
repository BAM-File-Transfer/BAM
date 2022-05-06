import '../styles/button.css'

// --- Abdullah's Routing ---
//import React from 'react'
//import { useNavigate } from 'react-router-dom'

//const Receive = () => {
//  const navigate = useNavigate()
//  const handleClick = () => {
//    alert('Receive Files')
//    navigate('/WaitForBump')

import '../styles/containers.css'
import React from "react"
import PropTypes from 'prop-types';
import JSZip from '../../node_modules/jszip/dist/jszip'
// import { saveAs } from 'file-saver';

var fileURLs = []
let addedFiles = 0
const Receive = ({ torrent }) => {
  
  const onClick = () => {
    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    console.log(torrent)
    const { WebTorrent } = window;
    let client = new WebTorrent();

    var torrentId = document.getElementById('seeder').value
    console.log("Torrent ID: ", torrentId)
    
    //window.open("file.pdf", "_blank")

    // https://webtorrent.io/docs
    client.add(torrentId, function (torrent) {
        torrent.files.forEach(function (file) {
          zip.file(file.path, Blob, {base64: true})
          // temporary code. will be replaced with updating Parent Component torr state
          file.getBlob(function (err, blob) {
            addedFiles += 1
            if (err) throw err
    
            // add file to zip
            zip.file(file.path, blob)
    
            // start the download when all files have been added
            if (addedFiles === torrent.files.length) {
              if (torrent.files.length > 1) {
                // generate the zip relative to the torrent folder
                zip = zip.folder(torrent.name)
              }
              zip.generateAsync({ type: 'blob' })
                .then(function (blob) {
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.download = "downloaded_files"
                  a.href = url
                  a.click()
                  setTimeout(function () {
                    URL.revokeObjectURL(url)
                  }, 30 * 1000)
                })
            }
          })
          file.getBlobURL(function callback(err, url) {
            if (err) throw err
  
            // Create the list
            let downloadList = document.getElementById('downloadList')
            let fileRow = document.createElement('li')
            downloadList.appendChild(fileRow)
            var a = document.createElement('a')
            a.download = file.name
            a.href = url
            a.textContent = 'Download ' + file.name
            fileRow.appendChild(a)
            fileURLs.push(url)
          })
        })
      })

  }

  // var zip = new JSZip();

// // Add an top-level, arbitrary text file with contents
// zip.file("Hello.txt", "Hello World\n");

// // Generate a directory within the Zip file structure
// var img = zip.folder("images");

// // Add a file to the directory, in this case an image with data URI as contents
// img.file("smile.gif", imgData, {base64: true});

// // Generate the zip file asynchronously
// zip.generateAsync({type:"blob"})
// .then(function(content) {
//     // Force down of the Zip file
//     saveAs(content, "archive.zip");
// });

  return (
    <div className="receivefiles">
      <ul className="receiveContainer">
        <li>
          <input type="text" id="seeder" placeholder="Enter seed" />
        </li>
        <li>
          <button type="button receive" className="button receiveFilesButton" onClick={onClick}>RECEIVE FILES</button>
        </li>
      </ul>
      <div id="downloadList" className="container-fluid">
        <div id="fileRow" />
      </div>
    </div>
  )
}

Receive.propTypes = {
  torrent: PropTypes.object
}

export default Receive