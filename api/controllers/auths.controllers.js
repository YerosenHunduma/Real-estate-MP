import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { errorhandler } from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(errorhandler(404, "user not found"));
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return next(errorhandler(401, "invalid credentials"));
    const token = jwt.sign({ id: user }, process.env.SECRET_KEY);
    const { password: pass, ...userinfo } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(200)
      .json({ success: true, userinfo });
  } catch (error) {
    next(error);
  }
};
