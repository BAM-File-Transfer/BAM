const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const sender = require('../models/Sender')

const MS_OFFSET = 5000;

dotenv.config({ path: "./../config/config.env" });

connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper Function
function getDateOffsetBySec (date, seconds) {
  let offsetDate = new Date(date);
  offsetDate.setSeconds(date.getSeconds() + seconds);
  return offsetDate;
}

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
  let max_date = 0;
  let min_date = 0;
  try {
    max_date = parseInt(req.body.date) + MS_OFFSET;
    min_date = parseInt(req.body.date) - MS_OFFSET;
  } catch {
    console.log("Invalid Date: " + req.body.date);
  }

  //TODO remove Debug prints
  console.log(new Date(max_date));
  console.log(new Date(min_date));
  
  // Request from database
  const request = {
    coordinates: req.body.coordinates,
    date: {
      $gt: new Date(min_date),
      $lt: new Date(max_date),
      // $gt: getDateOffsetBySec(req.body.date, -1 * SECOND_OFFSET),
      // $lt: getDateOffsetBySec(req.body.date, SECOND_OFFSET),
    },
  };

  try {
    await sender.findOne(request).then((response) => {
      console.log(response);

      if (!response) {
        // No match
        res.json({ status: "No Match" });
      } else {
        res.json(response);
      }
    });
  } catch {
    res.statusCode = 500; // Internal Server error
    res.json({ status: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log("Server started on 129.146.60.126:%d", PORT);
});
