const express = require('express');
const router = express.Router();

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
    let tier = 0
    let subtier = 0

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
    res.send('백준 랭킹 입니다.');
})

router.get('/codeRanking/:solveAcId', async (req, res) => {
    let { solveAcId } = req.params;
    let data = await getSolvedacUserData(solveAcId);
    console.log(data);
    res.redirect('/codeRanking')
});

module.exports = router;