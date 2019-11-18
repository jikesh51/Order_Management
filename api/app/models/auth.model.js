const mongoose = require('mongoose');
const loginCredential = mongoose.Schema({
    username: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('auth', loginCredential);