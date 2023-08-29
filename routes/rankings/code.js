const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../../middleware');
const catchAsync = require('../../utils/catchAsync');
const codeRanking = require('../../controllers/code');

router.route('/')
    .get(catchAsync(codeRanking.codeRankingRender))
    .post(isLoggedIn, catchAsync(codeRanking.codeRanking))

router.delete('/:id', isLoggedIn, catchAsync(codeRanking.codeRankingDelete));

module.exports = router