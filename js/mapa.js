
// Initialize the platform object:
var platform = new H.service.Platform({
'app_id': 'esgpefgkDV0uRo2GWinI',
'app_code': 'Qcq4vKeZx9k1cI-8kJyglw'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
document.getElementById('mapContainer'),
maptypes.normal.map,
{
  zoom: 10,
  center: { lng: 13.4, lat: 52.51 }
});
