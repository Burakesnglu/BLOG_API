'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    authorId: { //userId
        type: String
    },
    tagId: {
        type: String
    },
    editorsPick: {
        type: Boolean
    },
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    content: {
        type: String
    },
    summary: {
        type: String
    },
    status: {
        type: String
    }
}, {
    collection: 'Post',
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model('Post', PostSchema); 