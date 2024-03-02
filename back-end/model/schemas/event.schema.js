const { Schema, Types, model } = require('mongoose');

const eventSchema = new Schema({
    name: String,
    content: String,
    day: String,
    address: String,
    typeofevent: String,
    user: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ]
    }
})
const eventModel = model('events', eventSchema);
module.exports = {
    eventModel
}

