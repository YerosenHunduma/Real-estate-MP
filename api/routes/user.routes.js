import express from "express";
import {
  deleteUser,
  updateUser,
  getUserList,
  getLandlord,
} from "../controllers/user.controller.js";

import { authenticateJWT } from "../middlewares/passportJwtMiddleware.js";

const usersRoutes = express.Router();

usersRoutes.post("/update/:id", authenticateJWT, updateUser);
usersRoutes.delete("/delete/:id", authenticateJWT, deleteUser);
usersRoutes.get("/get-user-lists/:id", getUserList);
usersRoutes.get("/:id", getLandlord);
export default usersRoutes;
