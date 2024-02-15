import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../model/user.model.js";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const VerifiedUser = async (email, password, done) => {
  console.log("strat", email, password);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return done(null, false, { message: "Unknown user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("first", isMatch);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: "Either the Email or password you entered is incorrect",
      });
    }
  } catch (error) {
    return done(error);
  }
};

const local = new LocalStrategy(customFields, VerifiedUser);

export { local };
