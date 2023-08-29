const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, name, email } = req.body;
        const isInUser = await User.findOne({ username });
        if (isInUser) {
            return res.send('이미 존재하는 아이디입니다!');
        }
        const user = new User({ username, email, name });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            res.send('회원가입 및 로그인');
            // req.flash('success', 'Welcome');
            //res.redirect('/');
        })
    } catch (e) {
        // req.flash('error', e.message);
        console.log(`${e.message}`);
        res.redirect('register');
        return;
    }
};

module.exports.registerRender = (req, res) => {
    res.send('회원가입 페이지가 생성중 입니다.');
};

module.exports.loginRender = (req, res) => {
    res.send('로그인해주세요');
};

module.exports.login = (req, res) => {
    const redirectUrl = res.locals.returnTo || '/';
    res.send('로그인이 완료되었습니다.');
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send('로그아웃이 성공적으로 진행되었습니다.');
    });
}

module.exports.userpage = async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.send(`안녕하세요 ${user.name}님 환영합니다!`);
};