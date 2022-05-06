const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('../config/db')

dotenv.config({ path: './../config/config.env' })

connectDB()

const app = express()

app.get('/api', (req, res) => {
  res.json({ testObject: ['testElement'] })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log('Server started on port 5000') })
