const { Schema, Types, model } = require('mongoose');

const postSchema = new Schema({
    titel: String,
    content: String,
    daypost: String,
    author: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ]
    }
})
const postModel = model('posts', postSchema);
module.exports = {
    postModel
}

