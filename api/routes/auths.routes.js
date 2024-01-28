import express from "express";
import signup from "../controllers/auths.controllers.js";

const authsRoutes = express.Router();

authsRoutes.post("/signup", signup);

export default authsRoutes;
