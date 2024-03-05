const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    phonenumber: {
        type: Number,
    },
    event:{
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'events'
            }
        ]
    }
})
const userModel = mongoose.model('users', userSchema);


module.exports = {
    userModel
}