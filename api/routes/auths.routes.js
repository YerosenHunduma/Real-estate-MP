import express from "express";
import { signup, signin } from "../controllers/auths.controllers.js";

const authsRoutes = express.Router();

authsRoutes.post("/signup", signup);
authsRoutes.post("/login", signin);

export default authsRoutes;
