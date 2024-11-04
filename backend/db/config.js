const mongoose = require("mongoose");

const mongo_url = process.env.CONNECTION_STRING;

mongoose.connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB Conncection Error", err.message);
  });
