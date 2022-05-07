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
  res.json({ time: Date.now() })
})

app.listen(PORT, () => { console.log('Server started on 129.146.60.126:%d', PORT) })
