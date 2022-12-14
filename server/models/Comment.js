const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: String,
        ref: 'Movie'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    date: { type: Date,
    default: Date.now
    }
}, { timestamps: true, collection: 'comment' })

const Comment = mongoose.model('Comment', commentSchema);

module.exports =  Comment 