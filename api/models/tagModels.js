'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
}, {
    collection: 'Tag',
    versionKey: false,
    timestamps: true
}
);

module.exports = mongoose.model('Tag', TagSchema); 