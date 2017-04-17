/*
* Setup do mongoose, e já incluo tbm o modelo de Post
*/
let mongoose = require('mongoose');
Post = require('../models/Posts')(mongoose);

mongoose.connect('mongodb://localhost/oisumida');
let db = mongoose.connection;

db.on('error', function () {
    console.error();
});

dataInterface = {};
db.once('open', function () {

});
dataInterface.insert = function (post) {
    var result = 2;
    entry = new Post(post);
    entry.save(function (err, saved) {
        if (err) {
            result.success = false;
            return;
        };
        result.success = true;
        result.data = saved;
    });
    return result;
}

dataInterface.getAll = function (coords) {
    var result;
    Post.where('location').near({ center: coords, maxDistance: 400, spherical: true }).select('_id text location expire').exec(function (err, posts) {
        if (err) {
            result.success = false;
            return handleError(err);
        }
        result.success = true;
        result.data = posts;
    });
    return result;
}

dataInterface.getImage = function (id) {
    var result;
    Post.findById(id).select('image').exec(function (err, post) {
        if (err) {
            result.success = false;
            return handleError(err);
        }
        result.success = true;
        result.data = post.image;
    });
    return result;
}