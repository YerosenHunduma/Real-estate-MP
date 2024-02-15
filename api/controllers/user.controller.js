import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { errorhandler } from "../utils/customError.js";
import Listing from "../model/listing.model.js";

export const updateUser = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  console.log(req.params.id);
  try {
    if (password) {
      password = bcrypt.hashSync(password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email,
          password: password,
          avatar: avatar,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updateUser._doc;

    res.status(200).json({ success: true, rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "user delete successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getUserList = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};

export const getLandlord = async (req, res, next) => {
  try {
    const Landlord = await User.findById(req.params.id);
    if (!Landlord) {
      return next(errorhandler(404, "User is not found"));
    }
    const { password, ...landlord } = Landlord._doc;
    res.status(200).json({ success: true, landlord });
  } catch (error) {
    next(error);
  }
};
