require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Messages = require('./dbMessages');
const Pusher = require("pusher");
const pusherConfig = require('./config/pusherConfig');

const cors = require("cors");
const connectDB = require('./config/DB');
connectDB();


const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher(pusherConfig);


const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      });
    } else {
      console.log("Error triggering Pusher");
    }
  })
});




app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send("Hello world");
})

app.get('/api/v1/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data);
    }
  });
})

app.post('/api/v1/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(`new messages created: \n${data}`);
    }
  });
})


app.listen(port, () => {
  console.log(`Listen on localhost:${port}`);
})