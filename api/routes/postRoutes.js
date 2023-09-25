'use strict';


module.exports = function (app) {

    var postController = require('../controllers/postController'); 

    //Post 
    app.route('/v1/savePost').post(postController.savePost);

};