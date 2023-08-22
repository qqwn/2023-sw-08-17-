const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo, isLoggedIn } = require('../middleware');

router.get('/user/:id', isLoggedIn, catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.send(`안녕하세요 ${user.name}님 환영합니다!`);
}));

module.exports = router;