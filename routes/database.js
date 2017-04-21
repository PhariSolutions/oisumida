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
    console.log("Connected to database!");
});
dataInterface.insert = function (post, callback) {
    var entry = new Post(post);
    entry.save(function (err) {
        if (err) {
            console.log(err);
        }
    }).then(callback(entry));
}

/** 
 * Recebe as coordenadas e executa o callback com o resultado da query como argumento
 */
dataInterface.getAll = function (coords, callback) {
    Post.where('location').near({ center: coords, maxDistance: 400, spherical: true }).select('_id text location expire').exec(function (err, posts) {
        if (err) {
            return handleError(err);
        }
        callback(posts);
    });
}

dataInterface.getImage = function (id, callback) {
    Post.findById(id).select('image').exec(function (err, post) {
        if (err) {
            return handleError(err);
        }
        callback(post.image);
    });
}