
// mapa 
// Initialize the platform object:

var platform = new H.service.Platform({
  app_id: 'esgpefgkDV0uRo2GWinI',
  app_code: 'Qcq4vKeZx9k1cI-8kJyglw',
  useCIT: true,
  useHTTPS: true
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('map'),
  maptypes.normal.map,
  {
    zoom: 5,
    center: { lng: -76.0, lat: -10.0 }
  });
// Try HTML5 geolocation.

if (navigator.geolocation) {
  var currentPos = navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude, position.coords.longitude);
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    map.setCenter(pos);
    map.setZoom(12);
    var icon = new H.map.Icon('assets/images/mimarcador.png');
    var marker = new H.map.Marker(pos, { icon: icon });

    // Add the marker to the map:
    map.addObject(marker);
  });
} else {
  alert("Posición no disponible");
}
//Step 3: make the map interactive
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, maptypes);
