var map;

const DERBY_BOUNDS = {
  north: -1.556857,
  south: 52.861034,
  west: -1.383073,
  east: 52.968132,
};
const DERBY = { lat: 52.92277, lng: -1.47663 };

//Create a new blank array for all the listing markers
var markers = [];

var polygon = null;

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

function initMap() {

  // Create a styles array to use with the map.
  var styles = [{ featureType: "road", stylers: [{ hue: "#FFBB00" }, { saturation: 30 }, { lightness: 30 }, { gamma: 1 }] }, { featureType: "road.highway", stylers: [{ hue: "#FFC200" }, { saturation: -62 }, { lightness: 46 }, { gamma: 1 }] }, { featureType: "road.arterial", stylers: [{ hue: "#FF0300" }, { saturation: -100 }, { lightness: 51.2 }, { gamma: 1 }] }, { featureType: "road.local", stylers: [{ hue: "#FF0300" }, { saturation: -100 }, { lightness: 52 }, { gamma: 1 }] }, { featureType: "water", stylers: [{ hue: "#747ca9" }, { saturation: -20 }, { lightness: 2.4 }, { gamma: 1 }] }, { featureType: "landscape", elementType: "all", stylers: [{ hue: "#FFBB00" }, { saturation: 43.400000000000006 }, { lightness: 37.599999999999994 }, { gamma: 1 }] }, { featureType: "landscape", elementType: "geometry.fill", stylers: [{ visibility: "on" }, { color: "#fdb813" }, { saturation: "6" }, { lightness: "65" }, { gamma: "0.75" }] }, { featureType: "landscape.natural.landcover", elementType: "geometry.fill", stylers: [{ visibility: "on" }, { hue: "#daff00" }, { lightness: "99" }, { saturation: "-56" }] }, { featureType: "landscape.natural.terrain", elementType: "geometry.fill", stylers: [{ visibility: "on" }, { hue: "#c3ff00" }, { saturation: "-74" }, { lightness: "58" }, { gamma: "4.44" }, { weight: "0.92" }] }, { featureType: "poi", stylers: [{ hue: "#00FF6A" }, { saturation: -5.1 }, { lightness: 15.2 }, { gamma: 1 }] }],//map.setOptions({styles:styles});

    //Constructor creates a new map - only center and zoom are required
    map = new google.maps.Map(document.getElementById('map'), {
      center: DERBY,
      restriction: {
        latLngBounds: DERBY_BOUNDS,
        strictBounds: false,
      },

      //maximum zoom - how much detail
      zoom: 12,
      //displays a pan control for panning the map
      panControl: true,
      //displays a slider or "+/-" buttons to control the zoom level of the map
      zoomControl: true,
      //picks the best zoom control based on device and map size
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT
      },
      //let the user toggle between map types (roadmap and satellite)
      mapTypeControl: false,
      //displays a map scale element
      scaleControl: false,
      //displays a Pegman icon which can be dragged to the map to enable Street View
      streetViewControl: true,
      //displays a thumbnail overview map reflecting the current map viewport within a wider area
      overviewMapControl: true,
      //displays a small circular icon which allows you to rotate maps
      rotateControl: true,
      //if it is false enables default controls
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styles,

    });

  var largeInfowindow = new google.maps.InfoWindow();

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    }
  });


  //listing marker icon
  var defaultIcon = makeMarkerIcon('0B6623');

  //marker icon when the user hover the marker
  var highlightedIcon = makeMarkerIcon('50C878');

  //Create a new lat lng balance instance which captures the southwest and northeast corners of the viewport
  var bounds = new google.maps.LatLngBounds();
  // var list = document.getElementById('sidebar-nav');
  // var sideBarList = document.getElementById('sidebar-list');

  // const locations = [
  //   { title: 'Derby Silk Mill', location: { lat: 52.9254831, lng: -1.4756791 } },
  //   { title: 'Derby Museum and Art Gallery', location: { lat: 52.923039, lng: -1.480145 } },
  //   { title: 'Markeaton Park', location: { lat: 52.933525, lng: -1.505240 } },
  //   { title: 'Elvaston Castle Country Park', location: { lat: 52.892102, lng: -1.387390 } },
  //   { title: 'Alvaston Park', location: { lat: 52.9048659, lng: -1.438370 } },
  //   { title: 'Derby River Gardens', location: { lat: 52.922866, lng: -1.471988 } },
  //   { title: 'Oxygen Freejumping Derby', location: { lat: 52.9161095, lng: -1.444648 } },
  //   { title: 'Hollywood Bowl Derby', location: { lat: 52.919967, lng: -1.473333 } },
  //   { title: 'Rollerworld of Derby', location: { lat: 52.937180, lng: -1.464893 } },
  //   { title: 'The Climbing Unit', location: { lat: 52.924742, lng: -1.450858 } },
  //   { title: 'Paint a Pot', location: { lat: 52.934804, lng: -1.505525 } },
  // ];

  var locationsDerby = {
    locations: ko.observableArray(),
    // showMarker: function{

    // }
  };

  locationsDerby.locations.push('Derby Silk Mill');
  locationsDerby.locations.push('Derby Museum and Art Gallery');
  locationsDerby.locations.push('Markeaton Park');
  locationsDerby.locations.push('Elvaston Castle Country Park');
  locationsDerby.locations.push('Alvaston Park');
  locationsDerby.locations.push('Derby River Gardens');
  locationsDerby.locations.push('Oxygen Freejumping Derby');
  locationsDerby.locations.push('Hollywood Bowl Derby');
  locationsDerby.locations.push('Rollerworld of Derby');
  locationsDerby.locations.push('The Climbing Unit');
  locationsDerby.locations.push('Paint a Pot');
  ko.cleanNode(document.getElementById('sidebar-list'));
  ko.cleanNode(document.getElementById('sidebar-nav'));
  ko.applyBindings(locationsDerby);


  // for (var i = 0; i < locations.length; i++) {
  //   //Get the position from the location array.
  //   var position = locations[i].location;
  //   var title = locations[i].title;
  //   var item = document.createElement('option');
  //   item.setAttribute("value", title);
  //   item.appendChild(document.createTextNode(title));
  //   list.appendChild(item);

  //   //Create a marker per location, and put into markers array.
  //   var marker = new google.maps.Marker({
  //     position: position,
  //     title: title,
  //     icon: defaultIcon,
  //     animation: google.maps.Animation.DROP,
  //     id: i
  //   });


  //   //Push the marker to our array of markers
  //   markers.push(marker);
  //   //Extend the boundaries of the map for each marker
  //   bounds.extend(marker.position);
  //   //Create an onclick event to open an infowindow at each marker
  //   marker.addListener('click', function () {
  //     populateInfoWindow(this, largeInfowindow);
  //   });

  //   marker.addListener('mouseover', function () {
  //     this.setIcon(highlightedIcon);
  //   });

  //   marker.addListener('mouseout', function () {
  //     this.setIcon(defaultIcon);
  //   });
  // }

  // for (var j = 0; j < locations.length; j++) {
  //   //Get the position from the location array.
  //   // position = locations[i].location;
  //   titleList = locations[j].title;
  //   itemList = document.createElement('li');
  //   itemList.setAttribute("value", titleList);
  //   itemList.appendChild(document.createTextNode(titleList));
  //   sideBarList.appendChild(itemList);
  // }

  //Push the marker to our array of markers
  markers.push(marker);
  //Extend the boundaries of the map for each marker
  bounds.extend(marker.position);
  //Create an onclick event to open an infowindow at each marker
  marker.addListener('click', function () {
    populateInfoWindow(this, largeInfowindow);
  });

  marker.addListener('mouseover', function () {
    this.setIcon(highlightedIcon);
  });

  marker.addListener('mouseout', function () {
    this.setIcon(defaultIcon);
  });

  //Event listeners to show and hide the places
  var showPlaces = document.getElementById('show-listings');
  var hidePlaces = document.getElementById('hide-listings');
  var toggleDrawingArea = document.getElementById('toggle-drawing');

  showPlaces.addEventListener('click', showListings);
  hidePlaces.addEventListener('click', hideListings);
  toggleDrawingArea.addEventListener('click', function () {
    toggleDrawing(drawingManager);
  });
  document.getElementById('zoom-to-area').addEventListener('click', function () {
    zoomToArea();
  });

  document.getElementById('trafficToggle').addEventListener('click', function () {
    toggleTraffic();
  });

  document.getElementById('search-within-time').addEventListener('click', function () {
    searchWithinTime();
  });

  drawingManager.addListener('overlaycomplete', function (event) {
    if (polygon) {
      polygon.setMap(null);
      hideListings();
    }

    drawingManager.setDrawingMode(null);
    polygon = event.overlay;
    polygon.setEditable(true);
    searchWithinPolygon();
    polygon.getPath().addListener('set_at', searchWithinPolygon);
    polygon.getPath().addListener('insert_at', searchWithinPolygon);
  });

  //This function populates the infowindow when the marker is clicked.
  //We'll only allow one infowindow which will open at the marker that is clicked, and populate based on that marker's position
  function populateInfoWindow(marker, infowindow) {
    //Check to make sure the infowindow is not already opened on this marker
    if (infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;
      //Make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null;
      });

      //Create a new infowindow service
      var streetViewService = new google.maps.StreetViewService();
      //This service needs to get the panorama image based on the closest location to the marker
      //and needs to find out which way to point the camera, the heading and the pitch
      var radius = 50;


      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
          infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No StreetView Found</div>');
        }
      }
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      infowindow.open(map, marker);
    }
  }


  //This function will loop through the markers array and display them all
  function showListings() {
    var bounds = new google.maps.LatLngBounds();
    //Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  //This function will loop through the markers array and hide them all
  function hideListings() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }


  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21, 34)
    );
    return markerImage;
  }

  function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
      drawingManager.setMap(null);
      if (polygon) {
        polygon.setMap(null);
      }
    } else {
      drawingManager.setMap(map);
    }
  }

  function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
      if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
        markers[i].setMap(map);
      }
      else {
        markers[i].setMap(null);
      }
    }
  }
  // This function takes the input value in the find nearby area text input
  // locates it, and then zooms into that area. This is so that the user can
  // show all listings, then decide to focus on one area of the map.
  function zoomToArea() {
    // Initialize the geocoder.
    var geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.
    var address = document.getElementById('zoom-to-area-text').value;
    // Make sure the address isn't blank.
    if (address == '') {
      window.alert('You must enter an area, or address.');
    } else {
      // Geocode the address/area entered to get the center. Then, center the map
      // on it and zoom in
      geocoder.geocode(
        {
          address: address,
          country: 'UK',
          componentRestrictions: { locality: 'Derby' }
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(13);
          } else {
            window.alert('We could not find that location - try entering a more' +
              ' specific place.');
          }
        });
    }
  }

  function searchWithinTime() {
    var distanceMatrixService = new google.maps.DistanceMatrixService;
    var address = document.getElementById('search-within-time-text').value;

    if (address == '') {
      window.alert('You must enter an address.');
    } else {
      hideListings();

      var origins = [];
      for (var i = 0; i < markers.length; i++) {
        origins[i] = markers[i].position;

      }
      var destination = address;
      var mode = document.getElementById('mode').value;

      distanceMatrixService.getDistanceMatrix({
        origins: origins,
        destinations: [destination],
        travelMode: google.maps.TravelMode[mode],
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          window.alert('Error was: ' + status);
        } else {
          displayMarkersWithinTime(response);
        }
      });
    }
  }

  function displayMarkersWithinTime(response) {
    var maxDuration = document.getElementById('max-duration').value;
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    var atLeastOne = false;
    //Nested loop to create one element per origin and destination pair.
    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < destinations.length; j++) {
        var element = results[j];
        if (element.status === "OK") {
          var distanceText = element.distance.text;
          var duration = element.duration.value / 60;
          var durationText = element.duration.text;

          if (duration <= maxDuration) {
            markers[i].setMap(map);
            atLeastOne = true;
            var infowindow = new google.maps.InfoWindow({
              content: durationText + ' away, ' + distanceText + '<div><input type=\"button\" value=\"View Route\" onclick=' + '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
            });
            infowindow.open(map, markers[i]);

            markers[i].infowindow = infowindow;
            google.maps.event.addListener(markers[i], 'click', function () {
              this.infowindow.close();
            });
          }
        }
      }
    }
    if (!atLeastOne) {
      window.alert('We could not find any locations within that distance!');
    }
  }

  function displayDirections(origin) {
    hideListings();
    var directionsService = new google.maps.DirectionsService;
    var destinationAddress =
      document.getElementById('search-within-time-text').value;
    var mode = document.getElementById('mode').value;
    directionsService.route({
      origin: origin,
      destination: destinationAddress,
      travelMode: google.maps.TravelMode[mode]
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          draggable: true,
          polylineOptions: {
            strokeColor: 'green'
          }
        });
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  //Function for toggle traffic on the map
  function toggleTraffic() {
    if (trafficLayer.getMap() === null) {
      //traffic layer is disabled.. enable it
      trafficLayer.setMap(map);
    } else {
      //traffic layer is enabled.. disable it
      trafficLayer.setMap(null);
    }
  }
  //create new traffic layer
  trafficLayer = new google.maps.TrafficLayer();

  //Needed to call the function so the markers are visible when the page loads
  showListings();



}


