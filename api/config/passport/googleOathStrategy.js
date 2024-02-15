import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../model/user.model.js";

const Google_Strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          googleId: profile.id,
          username: profile._json.given_name,
          email: profile.emails[0].value,
          avatar: profile._json.picture,
        });
        user = await newUser.save();
        console.log("new user registered");
        done(null, user);
      }
      console.log("user", user);
    } catch (error) {
      done(error, false);
    }
  }
);

export { Google_Strategy };
