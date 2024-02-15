import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { errorhandler } from "../utils/customError.js";
import jwt from "jsonwebtoken";
import passport from "passport";
const CLIENT_HOME_PAGE_URL = "http://localhost:5173";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return next(errorhandler(401, errorMessages));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err || !user) {
        const errorMessage = info ? info.message : "Authentication failed.";
        return next(errorhandler(401, errorMessage));
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      const { password: pass, ...userinfo } = user._doc;
      console.log("token", token);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ success: true, userinfo });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "sign out successfully!" });
  } catch (error) {
    next(error);
  }
};

export const GoogleSuccessHandler = async (req, res, next) => {
  console.log("firsttt", req.cookies);
  if (req && req.cookies.access_token) {
    const token = req.cookies.access_token;
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const userinfo = await User.findById(id);
    res.status(200).json({ success: true, userinfo });
  } else {
    return next(errorhandler(401, "user failed to authenticate"));
  }
};

export const GoogleCallbackHandler = (req, res) => {
  console.log("first", req.user);
  const userId = req.user._id;
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
  res.cookie("access_token", token, {
    httpOnly: true,
  });
  res.redirect(CLIENT_HOME_PAGE_URL);
};
