const express = require('express');
const router = express.Router({mergeParams : true});
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../models/user');
const { storeReturnTo, isLoggedIn } = require('../middleware');

router.get('/register', (req, res) => {
    res.send('회원가입 페이지가 생성중 입니다.');
})

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, name, email } = req.body;
        const user = new User({ username, email, name });
        console.log(user);
        const registeredUser = await User.register(user, password);
        console.log("1");
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.send('회원가입 및 로그인');
            // req.flash('success', 'Welcome');
            //res.redirect('/campgrounds');
        })
    } catch (e) {
        // req.flash('error', e.message);
        console.log(`${e.message}`);
        res.redirect('register');
        return;
    }
});

router.get('/login', (req, res) => {
    res.send('로그인해주세요');
})

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true,failureRedirect: '/login'}), (req, res) => {
    //req.flash('success', '환영합니다. 로그인이 완료되었습니다!');
    const redirectUrl = res.locals.returnTo || '/';
    res.send('로그인이 완료되었습니다.');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.send('로그아웃이 성공적으로 진행되었습니다.');
    });
});

module.exports = router;