const mongoose = require("mongoose")


const connectToMongoDB = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
      });
  };
  
  module.exports = connectToMongoDB;

