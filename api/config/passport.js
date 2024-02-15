import passport from "passport";
import { local } from "./passport/localStrategy.js";
import { Jwt_strategy } from "./passport/jwtStrategy.js";
import { Google_Strategy } from "./passport/googleOathStrategy.js";
import { Facebook_Strategy } from "./passport/facebookStrategy.js";

passport.use(local);
passport.use(Jwt_strategy);
passport.use(Google_Strategy);
passport.use(Facebook_Strategy);
