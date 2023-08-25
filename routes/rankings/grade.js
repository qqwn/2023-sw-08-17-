const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../../middleware');
const catchAsync = require('../../utils/catchAsync');
const gradeRanking = require('../../controllers/grade');

router.route('/')
    .get(catchAsync(gradeRanking.gradeRankingRander))
    .post(isLoggedIn, catchAsync(gradeRanking.gradeRanking))

router.delete('/:id', isLoggedIn, catchAsync(gradeRanking.gradeRankingDelete));

module.exports = router;
