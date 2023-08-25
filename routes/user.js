const express = require('express');
const router = express.Router({mergeParams : true});
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo, isLoggedIn } = require('../middleware');
const user = require('../controllers/user');

router.route('/register')
    .get(user.registerRender)
    .post(catchAsync(user.register))

router.route('/login')
    .get(user.loginRender)
    .post(user.login, storeReturnTo, passport.authenticate('local', {
        failureFlash: true, failureRedirect: '/login'
    }));

router.route('/logout')
    .get(isLoggedIn, user.logout);

router.get('/user/:id')
    .get(isLoggedIn, catchAsync(user.userpage));

module.exports = router;