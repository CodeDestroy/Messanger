const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
    user: {type: schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;