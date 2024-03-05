const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    content: String,
    typeofevent: String,
    user: {
        type: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        
    }
})
const eventModel = mongoose.model('events', eventSchema);
module.exports = {
    eventModel
}

