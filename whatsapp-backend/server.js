require('dotenv').config();
const connectDB = require('./config/DB');
connectDB();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 9000

app.get('/', (req, res) => {
  res.status(200).send("Hello world");
})

app.listen(port, () => {
  console.log(`Listen on localhost:${port}`);
})