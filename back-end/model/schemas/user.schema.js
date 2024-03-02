const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    fullname: String,
    password: String,
    phonenumber: String,
    role: String,
    username: String
})
const userModel = model('users', userSchema);
module.exports = {
    userModel
}

