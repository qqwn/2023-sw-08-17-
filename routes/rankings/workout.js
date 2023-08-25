const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require('../../middleware');
const catchAsync = require('../../utils/catchAsync');
const workoutRanking = require('../../controllers/workout');

router.route('/')
    .get(catchAsync(workoutRanking.workoutRankingRender))
    .post(isLoggedIn, catchAsync(workoutRanking.workoutRanking))

router.delete('/:id', isLoggedIn, catchAsync(workoutRanking.woroutRankingDelete));

module.exports = router;
