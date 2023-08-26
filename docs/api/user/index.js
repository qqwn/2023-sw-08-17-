const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const mypage = require('./mypage');

module.exports = {
    ...register,
    ...login,
    ...logout,
    ...mypage,
};