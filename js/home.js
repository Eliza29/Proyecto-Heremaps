var APPLICATION_ID = 'esgpefgkDV0uRo2GWinI',
APPLICATION_CODE = 'Qcq4vKeZx9k1cI-8kJyglw';

// mapa 

// Initialize the platform object:
var platform = new H.service.Platform({
  app_id: APPLICATION_ID,
  app_code: APPLICATION_CODE,
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

    function explorePlaces(platform) {
      var explore = new H.places.Explore(platform.getPlacesService());
      var params = {
        'cat': 'natural-geographical, leisure-outdoor',
        'in': '-3.73165,-73.24078;r=10000'  // Peru
      };
      
      explore.request(params, {}, onResult, onError);
    }
    // para mostrar mapas y tarjetas ver aqui
    // explorePlaces(platform);
  });
} else {
  alert("Posición no disponible");
}

// places


function onResult(result) {
  var places = result.results.items;
  console.log(places);
  addPlacesToMap(places);
  addPlacesToPanel(places);
}

function onError(error) {
  error = data;
}

var bubble;

function openBubble(position, text){
  if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}
function addPlacesToMap(places) {
  var group = new  H.map.Group();
  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getPosition());
    openBubble(
      evt.target.getPosition(), evt.target.content);
  }, false);

  group.addObjects(places.map(function (place) {
    var marker = new H.map.Marker({lat: place.position[0], lng: place.position[1]})
    marker.content = '<div style="font-size: 10px" ><h3>' + place.title +
      '</h3><h4>' + place.category.title + '</h4>' + place.vicinity + '</div>';
    return marker;
  }));

  map.addObject(group);

  // get geo bounding box for the group and set it to the map
  map.setViewBounds(group.getBounds());
}
function addPlacesToPanel(places){

  var nodeOL = document.createElement('ul'),
    i;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';

   for (i = 0;  i < places.length; i += 1) {
     var li = document.createElement('li'),
        divLabel = document.createElement('div'),
        content =  '<strong style="font-size: large;">' + places[i].title  + '</strong>';
        content += '&nbsp;<span style="font-size:smaller">(' +  places[i].category.title + ')</span></br>';
        content +=  places[i].vicinity + '</br>';
        content += '<strong>distance:</strong>' +  places[i].distance + 'm</br>';

      divLabel.innerHTML = content;
      li.appendChild(divLabel);
      nodeOL.appendChild(li);
  }

  placesContainer.appendChild(nodeOL);
}



var placesContainer = document.getElementById('panel');
//Step 3: make the map interactive
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, maptypes);

// places

