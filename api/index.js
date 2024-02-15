import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig.js";
import session from "express-session";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const allowedOrigin = "http://localhost:5173";
// app.use(
//   session({
//     name: "session",
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_KEY,
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

// Configure CORS options
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
import "./config/passport.js";

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  dbConnection;
});
