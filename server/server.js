const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const sender = require('../models/Sender')

dotenv.config({ path: "./../config/config.env" });

connectDB();

const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ testObject: ["testElement"] });
});

app.post("/send", async (req, res) => {
  // const dataEntry = req.body
  const dataEntry = {
    name: req.body.name,
    magnetLink: req.body.magnetLink,
    coordinates: req.body.coordinates,
    date: req.body.date
  }
  const send = await sender.create(dataEntry)
  console.log(send);
  
  // console.log("server.js: " + JSON.stringify(req.body));

  res.json({ status: "OK" });
});

app.post("/recv", async (req, res) => {
  // Request from database
  const dataEntry = {
    coordinates: req.body.coordinates
    // date: req.body.date
  }

  /*const receiver = */await sender.find(dataEntry).then( (response) => {
    console.log(response)
  })
  
  res.json({
    name: "Saitama",
    time: "now",
    location: "here",
    magnet:
      "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent",
  });
});

app.listen(PORT, () => {
  console.log("Server started on 129.146.60.126:%d", PORT);
});
