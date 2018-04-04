// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map').setView([40.786520, -73.907604], 14);

// Add base layer
L.tileLayer('https://api.mapbox.com/styles/v1/buraksancakdar/cjflezftyg9iw2sqrkoz42rif/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnVyYWtzYW5jYWtkYXIiLCJhIjoiY2o5b2F0bDNtNThzbjMyczQycGQzbDBidiJ9.N7qypSJrDL65wEEmVfZ6ng', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'apikey',
  username: 'buraksan'
});

// Initialze source data
//var source = new carto.source.Dataset('after_school_programs');
var source = new carto.source.SQL('SELECT * FROM after_school_programs');
// Create style for the data
var style = new carto.style.CartoCSS(`
#layer {
  marker-width: 8;
  marker-fill: #18B57F;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
  marker-line-width: 0.3;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);

// Add style to the data
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer
client.addLayer(layer);
client.getLeafletLayer().addTo(map);

map.setZoom(11);

/* 
*Assignment 8 Listen Layers */
// Step 1
var layerPicker = document.querySelector('.layer-picker');

// Step 2
layerPicker.addEventListener('change', function (e) {
  
  var setting = e.target.value;
// Step 3
  if (setting === 'all') {
    source.setQuery("SELECT * FROM after_school_programs");  
  }  
  else {
   source.setQuery("SELECT * FROM after_school_programs WHERE setting = '"+ setting +"'");
}
  
});

  
  