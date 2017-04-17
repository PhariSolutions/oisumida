let handshake = false;
socket.on('new', function (post) {
    updateLocal(post);
});
socket.on('welcome', function (data) {
    handshake = true;
    updateLocal(data);
});
socket.on('update', function (data) {
    if (handshake) {
        updateLocal(data);
    }
});

function sendNew() {
    inputs = document.getElementsByTagName('input');
    post = {
        text: inputs[0].value,
        ttl: inputs[2].value,
        loc: myLoc
    };
    // Pra quando tiver img
    if (false == true) {
        post.b64image = null;
    }
}
function updateLocal(data) {
    if (Array.isArray(data)) {
        markers.clearLayers();
        for (post in data) {
            var marker = L.marker(post.location.coordinates).addTo(markers);
            marker.bindPopup("<p>" + post.text + "</p><footer>" + post.expire.toString() + "</footer>");
        }
    } else {
        var marker = L.marker(data.location.coordinates).addTo(markers);
        marker.bindPopup("<p>" + data.text + "</p><footer>" + data.expire.toString() + "</footer>");
    }
}
map.locate({ setView: true, watch: true, enableHighAccuracy: true });
map.on('locationerror', function () {
    console.error();
});
map.on('locationfound', function (lev) {
    map.panTo(lev.latlng);
    myLoc = lev.latlng;
    if (!handshake) {
        socket.emit('handshake', lev.latlng);
    } else socket.emit('update', lev.latlng);
});