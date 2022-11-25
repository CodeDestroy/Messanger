const mongoose = require('mongoose');
const schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: "USER"

    },
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;