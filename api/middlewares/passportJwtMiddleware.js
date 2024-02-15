import passport from "passport";
import { errorhandler } from "../utils/customError.js";

const authenticateJWT = (req, res, next) => {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    async (err, user, info) => {
      try {
        if (err || !user) {
          const errorMessage = info ? info.message : "Authentication failed.";
          return next(errorhandler(401, errorMessage));
        }
        req.user = user;
        next();
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
};

export { authenticateJWT };
