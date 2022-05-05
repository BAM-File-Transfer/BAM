const express = require('express')
const app = express()
const PORT = 5000;

app.get('/api', (req, res) => {
  res.json({ testObject: ['testElement'] })
})

app.post('/send', (req, res) => {
  res.json({ status: 'OK' })
})

app.get('/recv', (req, res) => {
  res.json({ time: Date.now() })
})

app.listen(PORT, () => { console.log('Server started on 129.146.60.126:%d', PORT) })
