import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./config/dbConfig.js";
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
  console.log("Example app listening on port 3000!");
  dbConnection;
});
