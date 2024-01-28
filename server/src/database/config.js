const mongoose = require("mongoose")


const connectToMongoDB = () => {
    mongoose
      .connect("")
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
      });
  };
  
  module.exports = connectToMongoDB;

