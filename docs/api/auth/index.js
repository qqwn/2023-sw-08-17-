const authKakao = require('./kakao');
const authGoogle = require('./google');

module.exports = {
    ...authKakao,
    ...authGoogle
  };