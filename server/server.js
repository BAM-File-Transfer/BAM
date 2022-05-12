const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const sender = require('../models/Sender')

dotenv.config({ path: "./../config/config.env" });

connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ testObject: ["testElement"] });
});

app.post("/send", async (req, res) => {
  const dataEntry = {
    name: req.body.name,
    magnetLink: req.body.magnetLink,
    coordinates: req.body.coordinates,
    date: req.body.date
  }
  const send = await sender.create(dataEntry)
  console.log(send);
  
  res.json({ status: "OK" });
});

app.post("/recv", async (req, res) => {
  // Request from database
  const request = {
    coordinates: req.body.coordinates
    //TODO date checking in the request
  }

  try {
    await sender.findOne(request)
      .then( (response) => {
        console.log(response)

        if (!response) {  // No match
          res.json({ status: "No Match" })
        } else {
          res.json(response)
        }
      })

  } catch {
    res.statusCode = 500  // Internal Server error
    res.json({ status: "Database error" })
  }
});

app.listen(PORT, () => {
  console.log("Server started on 129.146.60.126:%d", PORT);
});
