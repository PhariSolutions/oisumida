var map = L.map('mapid', { zoomControl: false }).fitWorld();
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = new L.LayerGroup();
markers.addTo(map);
let myLoc;



