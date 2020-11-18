require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Messages = require('./dbMessages');
const connectDB = require('./config/DB');
connectDB();

const app = express();
const port = process.env.PORT || 9000

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Hello world");
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