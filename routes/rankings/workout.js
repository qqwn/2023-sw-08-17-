const express = require('express');
const router = express.Router({ mergeParams: true });
const CodeRanking = require('../../models/codeRanking');
const User = require('../../models/user');
const { isLoggedIn } = require('../../middleware');
const UserInfoError = require('passport-google-oauth20/lib/errors/userinfoerror');
const catchAsync = require('../../utils/catchAsync');
const { castObject } = require('../../models/user');
const codeRanking = require('../../models/codeRanking');
const workoutRanking = require('../../models/workoutRanking');

router.get('/', catchAsync(async (req, res) => {
    const WorkoutRankings = await workoutRanking.find();
    console.log(WorkoutRankings);
    res.send('운동 랭킹입니다. 랭킹 등록을 위해 로그인을 진행해주세요.');
}));

router.post('/', isLoggedIn, catchAsync(async (req, res) => {
    try {
        const user = await workoutRanking.findOne({ owner: { _id: req.user._id } });
        console.log(user);
        if (!user) {
            const data = new workoutRanking({ time: 0, owner: req.user._id });
            // await data.save();
            console.log('랭킹을 등록하시겠습니까?');
            return res.redirect('/wR');
            //랭킹 등록 여부를 묻고 등록 버튼을 통해 랭킹 등록
        }
        const { time } = req.body;
        user.time += time;
        console.log(user.time);
        await user.save();
        console.log('업데이트가 완료되었습니다.');
        return res.redirect('/wR');
    } catch (e) {
        res.send(e.message);   
    }
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const _id = req.params.id;
    await workoutRanking.findOneAndDelete({ owner: { _id } });
    req.flash('success', 'Successfully deleted review')
    res.redirect('/wR');
}))

module.exports = router;
