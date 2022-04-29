import '../styles/button.css'
import '../styles/containers.css'
import React from "react"
import PropTypes from 'prop-types';

const Receive = ({ torrent }) => {
  const onClick = () => {
    console.log(torrent)
    const { WebTorrent } = window;
    let client = new WebTorrent();

    var torrentId = document.getElementById('seeder').value
    console.log("Torrent ID: ", torrentId)

    // https://webtorrent.io/docs
    client.add(torrentId, function (torrent) {
      torrent.files.forEach(function (file) {
        // temporary code. will be replaced with updating Parent Component torr state
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
        })
      })
    })
  }

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