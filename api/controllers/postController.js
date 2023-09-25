'use strict';

//Mongoose
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    RequestResult = mongoose.model('RequestResult')
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const enums = require("../models/enums");
var ObjectId = require('mongodb').ObjectId;
const config = require('../config/config');
const Utilities = require('../middlewares/utilites');

exports.savePost = async function (req, res) {
    try {


        var result = new RequestResult({
            code: -1
        });

        var post = Object.assign(new Post(), req.body);


        if (!post.title || !post.content) {

            result.code = -1;
            result.message = "insufficient data";
            res.status(200).send(result);

            return;
        }

        Utilities.saveObject(Post, post, [], req.user, res);

    } catch (error) {
        console.log(error);
        // res.status(500).send(error.stack);
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
};