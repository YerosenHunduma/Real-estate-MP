import express from "express";
import {
  createListing,
  deleteListing,
  getList,
  getListings,
  updateListing,
} from "../controllers/Listing.controller.js";
import { authenticateJWT } from "../middlewares/passportJwtMiddleware.js";

const listingRoutes = express.Router();

listingRoutes.post("/create-listing", authenticateJWT, createListing);
listingRoutes.delete("/delete/:id", authenticateJWT, deleteListing);
listingRoutes.post("/update/:id", authenticateJWT, updateListing);
listingRoutes.get("/get-list/:id", getList);
listingRoutes.get("/get-list/detail", getList);
listingRoutes.get("/get-listings", getListings);

export default listingRoutes;
