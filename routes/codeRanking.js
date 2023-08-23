const express = require('express');
const router = express.Router({ mergeParams: true });
const CodeRanking = require('../models/codeRanking');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');
const UserInfoError = require('passport-google-oauth20/lib/errors/userinfoerror');
const catchAsync = require('../utils/catchAsync');
const { castObject } = require('../models/user');

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

router.get('/codeRanking', (req, res) => {
    res.send('백준 랭킹 입니다. 로그인 후 랭킹 등록이 가능합니다.');
})

router.get('/codeRanking/:id', catchAsync(async (req, res) => {
    const CodeRankings = await CodeRanking.find({});
    console.log(CodeRankings);
    res.send('백준 랭킹입니다. 랭킹 등록을 위해 백준 아이디를 입력해주세요.');
}));

router.post('/codeRanking/:id', isLoggedIn, catchAsync(async (req, res) => {
    try {
        const { solveAcHandle } = req.body;
        const data = await getSolvedacUserData(solveAcHandle);
        const tier = await calculateSolvedacTier(data.tier);
        const datas = new CodeRanking({ username: data.handle, rank: data.rank, tier });
        console.log(req.params.id);
        const auth = await User.findById(req.params.id);
        datas.author.push(auth);
        console.log(datas);
        await datas.save();
        res.redirect('/codeRanking/:id')
    } catch (e) {
        res.send('백준과 solve.ac가 연동되어있는지 확인해주세요.');
    }
}));

router.delete('/codeRanking/:id', isLoggedIn, catchAsync(async (req, res) => {
    
}))

module.exports = router;