const GoogleStrategy = require("passport-google-oauth2").Strategy;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');


const GOOGLE_CLIENT_ID = "1030066843880-skjj1603vsrf2s1mo4m82fga3p0nm8mo.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log(profile);
            console.log(accessToken);
            return done(null, profile);
        }
    )
);

router.get("/", passport.authenticate("google", {
    scope: ["email", "profile"]
}));

router.get("/callback", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

module.exports = router;