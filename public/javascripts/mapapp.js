var map = L.map('mapid', { zoomControl: false }).fitWorld();
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.dragging.disable();
var defaultIcon = L.icon({
    iconUrl: '/images/marker.png',
    iconSize: [50, 75], // size of the icon
    iconAnchor: [25, 70], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

var userLocationIcon = L.icon({
    iconUrl: '/images/user.png',
    iconSize: [25, 25], // size of the icon
    iconAnchor: [12.5, 12.5], // point of the icon which will correspond to marker's location
})

let markers = new L.LayerGroup();
let myMarker = L.marker([0, 0], { icon: userLocationIcon });
myMarker.setZIndexOffset(9000);
markers.addTo(map);
myMarker.addTo(map);
let myLoc = [];

function fullscreen(element = document.documentElement) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}


