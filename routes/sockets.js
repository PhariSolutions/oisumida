/**
 * Responsible for managing all client service connections
 */
var io = MODULES.io;
let concon = [];
io.on('connection', function (socket) {
    let conn = {};
    socket.on("handshake", function (loc) {
        pos = [loc.lat, loc.lng];
        result = dataInterface.getAll(pos);
        if (result.success) {
            socket.emit('welcome', result.data);
            conn = { id: socket.id, lastloc: pos };
            concon.push(conn);
        }
    });
    socket.on('new', function (data) {
        newPost = {
            text: data.text,
            image: b64image in data ? Buffer.from(data.b64image, 'base64') : null,
            location: {
                coordinates: [data.loc.lat, data.loc.lng]
            },
            expire: new Date((data.ttl * 1000) + new Date())
        }
        result = dataInterface.insert(newPost);
        if (result.success) {
            for (usr in concon) {
                p1 = usr.lastloc;
                p2 = result.data.location.coordinates;
                var d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
                if (d <= 400) {
                    io.sockets.connected[usr.id].emit('new', result.data);
                }
            }
        }
    });
    socket.on('update', function (loc) {
        pos = [loc.lat, loc.lng];
        result = dataInterface.getAll(pos);
        if (result.success) {
            socket.emit('update', result.data);
        }
    });
    socket.on('disconnect', function () {
        i = concon.indexOf(conn);
        concon.splice(i, 1);
    })
});
