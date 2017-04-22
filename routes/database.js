/*
* Setup do mongoose, e já incluo tbm o modelo de Post
*/
let mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

/**
 * 
 */
dataInterface.insert = function (post, image, callback) {
    let desgraca = function (entry) {
        if (image) {
            filename = path.join(__dirname, '..', '/public/images/submitted/', entry._id.toString()+ image.ext);
            fs.writeFile(filename, image.data, (err) => {
                if (err) throw err;
                entry.image = '/images/submitted/' + entry._id + image.ext;
                entry.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                }).then(callback(entry));
            });
        } else callback(entry);
    }
    var entry = new Post(post);
    entry.save(function (err) {
        if (err) {
            console.log(err);
        }
    }).then(desgraca(entry));
}

/** 
 * Recebe as coordenadas e executa o callback com o resultado da query como argumento
 */
dataInterface.getAll = function (coords, callback) {
    Post.where('location').near({ center: coords, maxDistance: 400, spherical: true }).select('_id text location expire image').exec(function (err, posts) {
        if (err) {
            return handleError(err);
        }
        callback(posts);
    });
}