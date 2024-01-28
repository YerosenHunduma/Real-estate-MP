import express from "express";
import authsRoutes from "./auths.routes.js";

const router = express.Router();

router.use("/api/auths", authsRoutes);

export default router;
