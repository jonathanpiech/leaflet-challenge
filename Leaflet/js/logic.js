// Gets URL to geojson data
var eqURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function createMap(earthquakes, circles) {

  // Creates background map layer
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Creates object to hold overlay layers
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Magnitudes": circles
  };

  // Creates map, both earthquakes and circles layers are active on start
  var myMap = L.map("map", {
    center: [0,0],
    zoom: 3,
    layers: [earthquakes, circles]
  });

  // Adds lightmap to map
  lightmap.addTo(myMap);

  // Creates a layer control
  L.control.layers(null, overlayMaps).addTo(myMap);

  // Creates legend
  var legend = L.control({
    position: "bottomright"
  });

  // Inserts a div with the class of "legend"
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = '<p>Magnitude</p>' +
    '<i style="background:#FEF0D9"></i>0-1<br>' + 
    '<i style="background:#FDD49E"></i>1-2<br>' +
    '<i style="background:#FDBB84"></i>2-3<br>' +
    '<i style="background:#FC8D59"></i>3-4<br>' +
    '<i style="background:#E34A33"></i>4-5<br>' +
    '<i style="background:#B30000"></i>5+<br>';
    return div;
  };
  // Adds legend to map
  legend.addTo(myMap);
}

// Creates function that will create marker layers for map
function createMarkers(earthquakeData) {

  // Defines a function that gets earthquake title and time for each
  // earthquake in features array
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h4>${feature.properties.title}</h4><br>
    <p>${new Date(feature.properties.time)}</p>`);
  }

  // Creates a GeoJSON layer that contains markers and popups of info
  // of each earthquake by using onEachFeature function
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Initializes empty array to hold magnitude data
  var magCircles = [];

  // Initializes color variable
  var color;

  // Creates a circle based on the magnitude of the earthquake for all
  // earthquakes in the data
  earthquakeData.forEach(eq => {

    var location = [eq.geometry.coordinates[1], eq.geometry.coordinates[0]];
    var magnitude = eq.properties.mag;

    // Changes color of circle based on magnitude
    if (magnitude > 5.0) {
      color = "#b30000";
    }
    else if (magnitude > 4.0) {
      color = "#e34a33";
    }
    else if (magnitude > 3.0) {
      color = "#fc8d59";
    }
    else if (magnitude > 2.0) {
      color = "#fdbb84";
    }
    else if (magnitude > 1.0) {
      color = "#fdd49e";
    }
    else {
      color = "#fef0d9";
    }

    // Creates circle for single location
    var magCircle = L.circle(location, {
      fillOpacity: 0.75,
      color: null,
      fillColor: color,
      radius: eq.properties.mag *20000
    });

    // Appends single circle to array of circles
    magCircles.push(magCircle);
  })

  // Runs createMap function with earthquakes and magCircles layers
  createMap(earthquakes, L.layerGroup(magCircles));
}

// Calls data from USGS endpoint
d3.json(eqURL, data => {
  // Runs createMarkers function with data.features object
  createMarkers(data.features);
});


