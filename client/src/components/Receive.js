import '../styles/button.css'
import React from "react"
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------------
// TEMPORARILY NOT NEEDED. ISSUE IS PASSING TORRENT LIST FROM SEND BUTTON TO THIS COMPONENT
// ----------------------------------------------------------------------------

const Receive = ({ torrent }) => {
  const onClick = () => {
    console.log(torrent)
    const { WebTorrent } = window;
    let client = new WebTorrent();

    // Sintel, a free, Creative Commons movie
    var torrentId = document.getElementById('seeder').value
    console.log("Torrend ID: ", torrentId)
    // let torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

    // https://webtorrent.io/docs
    client.add(torrentId, function (torrent) {
      // Torrents can contain many files. Let's use the .mp4 file

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

        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files

      })
    })
  }

  return (
    <div className="receivefiles">
      <input type="text" id="seeder" placeholder="Enter seed" />
      <button type="button receive" className="button receiveFilesButton col-2" onClick={onClick}>RECEIVE FILES</button>
      <div id="downloadList" className="container-fluid">
        <div id="fileRow" className="row">

        </div>
      </div>
    </div>
  )
}

Receive.propTypes = {
  torrent: PropTypes.object
}

export default Receive


// import '../styles/button.css'
// import React from 'react'

// const Receive = () => {
//   const handleClick = () => {
//     alert('Receive Files')
//   }

//   return (
//         <div className = "receivefiles">
//             <button type = "button" className="button receiveFilesButton col-2" onClick={handleClick}>RECEIVE FILES</button>
//         </div>
//   )
// }

// export default Receive
