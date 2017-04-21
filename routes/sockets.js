/**
 * Responsible for managing all client service connections
 */
var io = MODULES.io;
let concon = [];
io.on('connection', function (socket) {
    let conn = {};
    socket.on("handshake", function (loc) {
        pos = [loc.lat, loc.lng];
        console.log("Nova conexão! at " + pos);
        dataInterface.getAll(pos, function (data) {
            socket.emit('welcome', data);
            conn = { id: socket.id, lastloc: pos };
            concon.push(conn);
        });
    });
    socket.on('new', function (data) {
        let ref = [1, 15, 30, 60, 120, 240, 480, 720, 1440, 2880];
        var actualTTL = ref[data.ttl] * 60 * 1000;
        newPost = {
            text: data.text,
            image: data.b64image ? Buffer.from(data.b64image, 'base64') : null,
            location: {
                coordinates: [data.loc.lat, data.loc.lng]
            },
            expire: new Date(actualTTL + new Date().getTime())
        }
        dataInterface.insert(newPost, function (data) {
            for (var i=0; i < concon.length; i++) {
                p1 = concon[i].lastloc;
                p2 = data.location.coordinates;
                var d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
                if (d <= 400) {
                    io.sockets.connected[concon[i].id].emit('new', data);
                }
            }
        });
    });
    socket.on('update', function (loc) {
        pos = [loc.lat, loc.lng];
        result = dataInterface.getAll(pos, function (data) {
            socket.emit('update', data);
        });
    });
    socket.on('disconnect', function () {
        i = concon.indexOf(conn);
        concon.splice(i, 1);
    })
});
