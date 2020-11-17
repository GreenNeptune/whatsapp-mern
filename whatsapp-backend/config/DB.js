const mongoose = require('mongoose');

const { MONGO_PASSWORD, MONGO_USER, MONGO_DB_NAME } = process.env;

const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.8irkm.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
