import express from "express";
import authsRoutes from "./auths.routes.js";
import errorHandlerMiddleware from "../middlewares/error.js";

const router = express.Router();

router.use("/api/auths", authsRoutes);
router.use(errorHandlerMiddleware);

export default router;
