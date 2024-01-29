import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res, next) => {
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

export default signup;
