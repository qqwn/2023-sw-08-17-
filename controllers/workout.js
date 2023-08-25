const WorkoutRanking = require('../models/workoutRanking');

module.exports.workoutRankingRender = async (req, res) => {
    const WorkoutRankings = await WorkoutRanking.find();
    console.log(WorkoutRankings);
    res.send('운동 랭킹입니다. 랭킹 등록을 위해 로그인을 진행해주세요.');
}

module.exports.workoutRanking = async (req, res) => {
    try {
        const user = await WorkoutRanking.findOne({ owner: { _id: req.user._id } });
        console.log(user);
        if (!user) {
            const newUser = new WorkoutRanking({ time: 0, owner: req.user._id });
            await newUser.save();
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
}

module.exports.woroutRankingDelete = async (req, res) => {
    const _id = req.params.id;
    await WorkoutRanking.findOneAndDelete({ owner: { _id } });
    req.flash('success', 'Successfully deleted review')
    res.redirect('/wR');
}