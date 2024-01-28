import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB", error.message);
  });

export default dbConnection;
