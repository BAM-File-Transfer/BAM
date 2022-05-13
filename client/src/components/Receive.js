import "../styles/button.css";

// --- Abdullah's Routing ---
//import { useNavigate } from 'react-router-dom'

//const Receive = () => {
//  const navigate = useNavigate()
//  const handleClick = () => {
//    alert('Receive Files')
//    navigate('/WaitForBump')

import "../styles/button.css";
import "../styles/containers.css";
import React from "react";
import PropTypes from "prop-types";
import { APIrecv } from "./ApiFetch";
import JSZip from "../../node_modules/jszip/dist/jszip";
import downloadIcon from "../assets/download.png";

let addedFiles = 0;
// var torrentId = "";
const Receive = ({ torrent }) => {
  const onClick = () => {
    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    console.log(torrent);
    const { WebTorrent } = window;
    let client = new WebTorrent();

    // var torrentId = document.getElementById('seeder').value //TODO remove
    const clientData = {
      name: "Superman",
      // magnetLink: "",
      coordinates: [115, 115],
      date: Date.now(),
    };
    APIrecv(clientData).then((response) => {
      console.log("Torrent ID: ", response.magnetLink);

      let torrentId = response.magnetLink;
      // https://webtorrent.io/docs
      client.add(torrentId, function (torrent) {
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
  };

  return (
    <div className="receivefiles">
      <ul className="receiveContainer">
        <li>
          <input type="text" id="seeder" placeholder="Enter seed" />
        </li>
        <li>
          <button
            type="button receive"
            className="button receiveFilesButton"
            onClick={onClick}
          >
            RECEIVE FILES
          </button>
        </li>
      </ul>
      <div
        id="downloadList"
        className="downloadListContainer container-fluid"
      ></div>
    </div>
  );
};

Receive.propTypes = {
  torrent: PropTypes.object,
};

export default Receive;
