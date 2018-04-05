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
var afterschoolsource = new carto.source.SQL('SELECT * FROM after_school_programs');
// Create style for the data
var style = new carto.style.CartoCSS(`
##layer {
  marker-width: 12;
  marker-fill: #18b57f;
  marker-fill-opacity: 0.2;
  marker-allow-overlap: true;
  marker-line-width: 0.5;
  marker-line-color: #ffffff;
  marker-line-opacity: 0.1;
  
  [high_schoo = "yes"] {
    marker-fill: #18B57F;
  }
   [high_schoo = "Yes"] {
    marker-fill: #18B57F;
  }
  [enrollment = 150] {
  	marker-width: 12;
  }
  [zoom >= 15] {
    marker-width: 25;
    marker-fill:#18B57F;
    marker-fill-opacity: 0.2;
    marker-line-color: #ffffff;
	}
}
`);

// Add style to the data
var afterschoollayer = new carto.layer.Layer(afterschoolsource, style);

// Add the data to the map as a layer

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
    afterschoolsource.setQuery("SELECT * FROM after_school_programs");  
  }  
  else {
   afterschoolsource.setQuery("SELECT * FROM after_school_programs WHERE setting = '"+ setting +"'");
}
  
});
/* 
* Listen Layers 2 */
// Step 1
var layerPicker2 = document.querySelector('.layer-picker2');

// Step 2
layerPicker2.addEventListener('change', function (f) {
  
  var setting = f.target.value;
// Step 3
  if (setting === 'all') {
    afterschoolsource.setQuery("SELECT * FROM after_school_programs");  
  }  
  else {
   afterschoolsource.setQuery("SELECT * FROM after_school_programs WHERE site_borou = 'Bronx'");
}
  
});

// Layer Two: Grand Concourse and AFH
// Initialze source data
var nycparkssource = new carto.source.SQL('SELECT * FROM nyc_parks');

// Create style for the data
var nycparksStyle = new carto.style.CartoCSS(`
  #layer {
  polygon-fill: #655596;
  polygon-opacity: 0.4;
  ::outline {
    line-color: #FFFFFF;
    line-width: 0.5;
    line-opacity: 0.5;
  }
}
`);

// Add style to the data
var nycparksLayer = new carto.layer.Layer(nycparkssource, nycparksStyle);

// Add the data to the map as two layers. Order matters here--first one goes on the bottom
client.addLayers([afterschoollayer,nycparksLayer]);
client.getLeafletLayer().addTo(map);

//Dropdown for Parks Layer

var nycparks = document.querySelector('.nycparks');

// Step 2
nycparks.addEventListener('change', function (h) {
  
  var setting = h.target.value;
// Step 3
  if (setting === 'all') {
    nycparkssource.setQuery("SELECT * FROM nyc_parks");  
  }  
  else {
   nycparkssource.setQuery("SELECT * FROM nyc_parks WHERE landuse = 'Community Park'");
}
  
});

  
  