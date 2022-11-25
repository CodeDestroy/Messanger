const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    User_nick: {
        type: String,
        unique: true,
        required: true,

    },
    User_pass: {
        type: String,
        required: true,
    },
    User_name: {
        type: String,
        required: true,
    },
    User_surname: {
        type: String,
        required: true,
    },
    roles: [{type: String, ref: 'Role'}]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;