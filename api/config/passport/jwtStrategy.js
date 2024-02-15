import User from "../../model/user.model.js";
import { Strategy as JwtStrategy } from "passport-jwt";

const cookieExtractor = (req) => {
  console.log("req", req.cookies);

  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  console.log("Token extracted:", token);
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

const Jwt_strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  console.log("JWT Payload:", jwt_payload);
  try {
    const user = await User.findOne({ _id: jwt_payload.id });
    console.log("user", user);
    if (!user) {
      // Redirect to login page if there's no user
      return done(null, false, {
        message: "Your are not authorized to access",
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

export { Jwt_strategy };
