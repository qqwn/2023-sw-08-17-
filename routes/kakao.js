const express = require('express');
const router = express.Router();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const KAKAO_CLIENT_ID = '0cf16336a335544632f32669ab7689ab';

passport.use(
    new KakaoStrategy({
        callbackURL: '/callback',
        clientID: KAKAO_CLIENT_ID, 
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        return done(null, profile);
    }
));

router.get('/', passport.authenticate('kakao'));

router.get('/callback', passport.authenticate('kakao', {
    failureRedirect: '/login',
  }), (req, res) => {
    res.redirect('/');
  });

module.exports = router;