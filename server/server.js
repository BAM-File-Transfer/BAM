const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000;

app.use(cors())

app.get('/api', (req, res) => {
  res.json({ testObject: ['testElement'] })
})

app.post('/send', (req, res) => {  // Change these GET requests to POST requests
  res.json({ status: 'OK' })
})

app.post('/recv', (req, res) => {  // Change these GET requests to POST requests
  res.json({
    name: "Saitama",
    time: "now",
    location: "here",
    magnet: "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent",
  })
})

app.listen(PORT, () => { console.log('Server started on 129.146.60.126:%d', PORT) })
