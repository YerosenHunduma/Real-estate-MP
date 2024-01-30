import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./config/dbConfig.js";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  dbConnection;
});
