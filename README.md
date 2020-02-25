# usgs-earthquakes


## Summary
This project uses a GeoJSON data feed from the United States Geological Survey (USGS) to show the locations and magnitude of all earthquakes that have occured in the past week. The data can be found at https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson. The size and colors of the circles on the map are based on the magnitude of the earthquakes.

![alt-text](https://raw.githubusercontent.com/jonathanpiech/usgs-earthquakes/master/earthquakes1.png "Image of map on startup")

A pop-up showing the location, magnitude, time, and date of the earthquake appears when a marker is clicked on.

![alt-text](https://raw.githubusercontent.com/jonathanpiech/usgs-earthquakes/master/earthquakes2.png "Map with pop-up")

This project uses the Leaflet and D3 Javascript libraries.


## Requirements
This project requires a Mapbox API key to run. If you want to run yourself, download the repository and create a "config.js" file in the js folder with your Mapbox API key with variable API_KEY to see the map. i.e.
`const API_KEY = "Your API Key";`