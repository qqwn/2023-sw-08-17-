const AlcoholRanking = require('../models/alcoholRanking');

module.exports.alcoholRankingRender = async (req, res) => {
    const alcoholRankings = await AlcoholRanking.find();
    console.log(alcoholRankings);
    res.send(alcoholRankings);
};

module.exports.alcoholRanking = async (req, res) => {
    try {
        const user = await AlcoholRanking.findOne({ owner: { _id: req.user._id } });
        console.log(user);
        if (!user) {
            const newUser = new AlcoholRanking({ time: 0, owner: req.user._id });
            await newUser.save();
            console.log('랭킹을 등록하시겠습니까?');
            return res.redirect('/aR');
            //랭킹 등록 여부를 묻고 등록 버튼을 통해 랭킹 등록
        }
        const { bottle } = req.body;
        user.bottle += bottle;
        console.log(user.bottle);
        await user.save();
        console.log('업데이트가 완료되었습니다.');
        return res.redirect('/aR');
    } catch (e) {
        res.send(e.message);
    }
};

module.exports.alcoholRankingDelete = async (req, res) => {
    const _id = req.params.id;
    await AlcoholRanking.findOneAndDelete({ owner: { _id } });
    res.redirect('/aR');
};
