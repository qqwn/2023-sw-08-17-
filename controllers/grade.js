const GradeRanking = require('../models/gradeRanking');

module.exports.gradeRankingRander = async (req, res) => {
    const gradeRankings = await GradeRanking.find();
    console.log(gradeRankings);
    res.send(gradeRankings);
}

module.exports.gradeRanking = async (req, res) => {
    try {
        const user = await GradeRanking.findOne({ owner: { _id: req.user._id } });
        console.log(user);
        if (!user) {
            const newUser = new GradeRanking({ time: 0, owner: req.user._id });
            await newUser.save();
            console.log('랭킹을 등록하시겠습니까?');
            return res.redirect('/gR');
            //랭킹 등록 여부를 묻고 등록 버튼을 통해 랭킹 등록
        }
        const { grade } = req.body;
        user.grade = grade;
        console.log(user.grade);
        await user.save();
        console.log('업데이트가 완료되었습니다.');
        return res.redirect('/gR');
    } catch (e) {
        res.send(e.message);   
    }
}

module.exports.gradeRankingDelete = async (req, res) => {
    const _id = req.params.id;
    await GradeRanking.findOneAndDelete({ owner: { _id } });
    req.flash('success', 'Successfully deleted review')
    res.redirect('/gR');
}