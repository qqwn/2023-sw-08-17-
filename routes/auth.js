const GoogleStrategy = require("passport-google-oauth2").Strategy;
const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const catchAsync = require('../models/user');
const { storeReturnTo, isLoggedIn } = require('../middleware');


const GOOGLE_CLIENT_ID = "1030066843880-skjj1603vsrf2s1mo4m82fga3p0nm8mo.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "yGOCSPX-Q7D7mg5cJxEuNOuggtZfOEfEHXIg";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback",
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log(profile);
            console.log(accessToken);

            return done(null, profile);
        }
    )
);

router.get("/auth/google",passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/auth/google/callback",passport.authenticate("google", {successRedirect: "/",failureRedirect: "/login",})
);