const CodeRanking = require('../models/codeRanking');

all_tier = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby']
all_subtier = ['V', "IV", 'III', 'II', 'I']

const getSolvedacUserData = async Id => {
    let response = await fetch(`https://solved.ac/api/v3/user/show?handle=${Id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let data = await response.json();
    return data;
}

const calculateSolvedacTier = async idx => {
    let tier = 0;
    let subtier = 0;
    if (Number.isInteger(idx/5)) {
        tier = Math.floor(idx/5)-1
    } else {
        tier = Math.floor(idx/5)
    }
    if (idx%5 == 1) {
        subtier = 0
    }else if (idx%5 == 0) {
        subtier = 4
    } else {
        subtier = (idx%5)-1
    }
    return `${all_tier[tier]} ${all_subtier[subtier]}`
}

module.exports.codeRankingRender = async (req, res) => {
    const CodeRankings = await CodeRanking.find();
    console.log(CodeRankings);
    res.send('백준 랭킹입니다. 랭킹 등록을 위해 로그인을 진행해주세요.');
}

module.exports.codeRanking = async (req, res) => {
    try {
        const { solveAcHandle } = req.body;
        const isUser = await CodeRanking.findOne({ username: solveAcHandle })
        if(isUser) {
            //req.flash('error', '하나의 계정 당 하나의 아이디만 확인이 가능합니다.');
            console.log('하나의 계정 당 하나의 아이디만 등록 가능합니다.');
            return res.redirect('/codeRanking');
        }
        const data = await getSolvedacUserData(solveAcHandle);
        const tier = await calculateSolvedacTier(data.tier);
        const datas = new CodeRanking({ username: data.handle, rank: data.rank, tier, author: req.user._id });
        await datas.save();
        let codeDb = await CodeRanking.find();
        let codeDbs = codeDb.sort((a, b) => (a.rank - b.rank));
        await codeDbs.save();
        return res.redirect('/cR');
    } catch (e) {
        res.send(e.message);
    }
}

module.exports.codeRankingDelete = async (req, res) => {
    const _id = req.params.id;
    await CodeRanking.findOneAndDelete({ author: { _id } });
    req.flash('success', 'Successfully deleted review')
    res.redirect('/cR');
}