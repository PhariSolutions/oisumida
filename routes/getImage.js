app.get('/image/:postId', function (req, res, next) {
    result = dataInterface.getImage(req.params.postId);
    if (result.success) {
        res.type('jpeg');
        res.write(result.image, 'binary');
        res.end(null, 'binary');
    }
    res.setStatus(404);
})