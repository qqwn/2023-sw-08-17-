const alcohol = require('./alcohol');
const code = require('./code');
const grade = require('./grade');
const workout = require('./workout');

module.exports = {
    ...alcohol,
    ...code,
    ...grade,
    ...workout,
};