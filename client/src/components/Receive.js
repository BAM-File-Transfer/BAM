import '../styles/button.css'
import React from "react"
import PropTypes from 'prop-types';

const Receive = ({torrent}) => {    
    const onClick = () => {
      console.log(torrent)
      const { WebTorrent } = window;
      let client = new WebTorrent();
  
      // Sintel, a free, Creative Commons movie
      let torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
  
      // https://webtorrent.io/docs
      client.add(torrentId, function (torrent) {
        // Torrents can contain many files. Let's use the .mp4 file
        let file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4')
        })
  
        // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
        file.getBlobURL(function callback(err, url) {
          if (err) throw err
          var a = document.createElement('a')
          a.download = file.name
          a.href = url
          a.textContent = 'Download ' + file.name
          // this.setState( {files:file} )
          // console.log(a)
          document.body.appendChild(a)
          
        })
      })
    }

    return (
          <div className = "receivefiles">
              <button type = "button receive" className="button receiveFilesButton col-2" onClick={onClick}>RECEIVE FILES</button>
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
