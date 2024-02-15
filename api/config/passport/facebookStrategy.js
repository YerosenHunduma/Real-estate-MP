import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../../model/user.model.js";

const Facebook_Strategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
    profileFields: ["id", "displayName", "name", "gender", "email", "picture"],
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(profile.photos[0].value);
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          facebookId: profile.id,
          username: profile.displayName,
          avatar: profile.photos[0].value,
        });
        user = await newUser.save();
        console.log("new user registered");
        done(null, user);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export { Facebook_Strategy };
