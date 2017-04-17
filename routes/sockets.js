/**
 * Responsible for managing all client service connections
 */
var io = MODULES.io;

io.on('connection', function (socket) {
    socket.on("handshake", function (loc) {
        pos = [loc.coords.latitude, loc.coords.longitude];
        result = dataInterface.getAll(pos);
        if (result.success) {
            socket.emit('welcome', result.data);
        }
    });
    socket.on('new', function (data) {
        newPost = {
            text: data.text,
            image: b64image in data ? Buffer.from(data.b64image, 'base64') : null,
            location: {
                coordinates: [data.loc.coords.latitude, data.loc.coords.longitude]
            },
            expire: new Date((data.ttl * 1000) + new Date())
        }
        result = dataInterface.insert(newPost);
        socket.emit('success', result);
    });
});
