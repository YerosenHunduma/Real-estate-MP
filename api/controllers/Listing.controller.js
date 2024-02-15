import { trusted } from "mongoose";
import Listing from "../model/listing.model.js";
import { errorhandler } from "../utils/customError.js";

export const createListing = async (req, res, next) => {
  console.log("createlis", req.body);
  try {
    const List = await Listing.create(req.body);
    console.log(List);
    return res.status(201).json({ success: true, List });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const list = await Listing.findOne({ _id: req.params.id });
    if (!list) {
      return next(errorhandler(404, "Listing not found"));
    }
    await Listing.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "listing delete successfully!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const list = await Listing.findOne({ _id: req.params.id });
    if (!list) {
      return next(errorhandler(404, "Listing not found"));
    }
    const updatedlist = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, updatedlist });
  } catch (error) {
    next(error);
  }
};

export const getList = async (req, res, next) => {
  const list = await Listing.findById(req.params.id);
  console.log(list);
  try {
    if (!list) {
      return next(errorhandler(404, "Listing not found"));
    }
    res.status(200).json({ success: true, list });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  // console.log("query", req.query);
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === false) {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "createdAt";
    let order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .skip(startIndex)
      .limit(limit);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
