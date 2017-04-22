let handshake = false;
socket.on('new', function (post) {
    updateLocal(post);
});
socket.on('welcome', function (data) {
    handshake = true;
    setInterval(function () { socket.emit('update', myLoc) }, 5000);
});
socket.on('update', function (data) {
    if (handshake) {
        updateLocal(data);
    }
});

function sendNew(post) {
    console.log(post)
    socket.emit('new', post);
}

function updateLocal(data) {
    if (Array.isArray(data)) {
        var newmarkers = new L.LayerGroup();
        for (var i = 0; i < data.length; i++) {
            var marker = L.marker(data[i].location.coordinates, { icon: defaultIcon }).addTo(newmarkers);
            var img = data[i].image ? '<img src="' + data[i].image + '">' : '';
            var footer = '<footer>' + data[i].expire + '</footer>';
            marker.bindPopup("<p>" + data[i].text + '</p><div onclick="fullscreen(this)">' + img + "</div>" + footer, { closeOnClick: false, keepInView: true });
        }
        newmarkers.addTo(map);
        map.removeLayer(markers);
        markers = newmarkers;
    }
}

map.locate({ setView: true, watch: true, enableHighAccuracy: true });
map.on('locationerror', function () {
    console.error();
});
map.on('locationfound', function (lev) {
    map.panTo(lev.latlng);
    myLoc = lev.latlng;
    myMarker.setLatLng(lev.latlng).update();
    if (!handshake) {
        socket.emit('handshake', lev.latlng);
    } else socket.emit('update', lev.latlng);
});