const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../../middleware');
const catchAsync = require('../../utils/catchAsync');
const alcoholRanking = require('../../controllers/alcohol');

router.route('/')
    .get(catchAsync(alcoholRanking.alcoholRankingRender))
    .post(isLoggedIn, catchAsync(alcoholRanking.alcoholRanking));

router.delete('/:id', isLoggedIn, catchAsync(alcoholRanking.alcoholRankingDelete));

module.exports = router;
