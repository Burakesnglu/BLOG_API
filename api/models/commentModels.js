'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    postId: {
        type: String
    },
    content: {
        type: String
    },
}, {
    collection: 'Comment',
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model('Comment', CommentSchema); 