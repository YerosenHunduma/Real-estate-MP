import express from "express";
import {
  GoogleCallbackHandler,
  GoogleSuccessHandler,
  signOut,
  signin,
  signup,
} from "../controllers/auths.controllers.js";
import { regiterValidator } from "../validators/registrationValidators.js";
import passport from "passport";
import { errorhandler } from "../utils/customError.js";

const authsRoutes = express.Router();

authsRoutes.post("/signup", regiterValidator, signup);
authsRoutes.post("/login", signin);
authsRoutes.get("/logout", signOut);

authsRoutes.get("/success", GoogleSuccessHandler);

authsRoutes.get("/login/failed", (req, res) => {
  return next(errorhandler(401, "user failed to authenticatecfe"));
});

authsRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authsRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auths/login/failed",
  }),
  GoogleCallbackHandler
);

authsRoutes.get("/auth/facebook", passport.authenticate("facebook"));

authsRoutes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/api/auths/login/failed",
  }),
  GoogleCallbackHandler
);
export default authsRoutes;
