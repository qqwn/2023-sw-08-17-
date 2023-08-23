const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true,
    },
    tier: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('CodeRanking', CodeSchema);