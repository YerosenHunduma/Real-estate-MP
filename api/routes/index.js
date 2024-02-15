import express from "express";
import authsRoutes from "./auths.routes.js";
import errorHandlerMiddleware from "../middlewares/error.js";
import usersRoutes from "./user.routes.js";
import listingRoutes from "./listing.routes.js";

const router = express.Router();

router.use("/api/auths", authsRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/lists", listingRoutes);
router.use(errorHandlerMiddleware);

export default router;
