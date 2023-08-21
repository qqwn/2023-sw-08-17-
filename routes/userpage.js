const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const catchAsync = require('../models/user');
const { storeReturnTo, isLoggedIn } = require('../middleware');

router.get('/user:id', isLoggedIn, catchAsync(async (req, res) => {
    const user = await User.findById(req.params._id);
    console.log(user);
    res.send(`this is ${user.name}'s page.`, {user});
}));

module.exports = router;