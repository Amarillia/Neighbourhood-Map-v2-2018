var map;

//Create a new blank array for all the listing markers
var markers = [];

function initMap() {

  var derby = {lat: 52.92277, lng: -1.47663};

  // Create a styles array to use with the map.
  var styles=[{featureType:"road",stylers:[{hue:"#FFBB00"},{saturation:30},{lightness:30},{gamma:1}]},{featureType:"road.highway",stylers:[{hue:"#FFC200"},{saturation:-62},{lightness:46},{gamma:1}]},{featureType:"road.arterial",stylers:[{hue:"#FF0300"},{saturation:-100},{lightness:51.2},{gamma:1}]},{featureType:"road.local",stylers:[{hue:"#FF0300"},{saturation:-100},{lightness:52},{gamma:1}]},{featureType:"water",stylers:[{hue:"#747ca9"},{saturation:-20},{lightness:2.4},{gamma:1}]},{featureType:"landscape",elementType:"all",stylers:[{hue:"#FFBB00"},{saturation:43.400000000000006},{lightness:37.599999999999994},{gamma:1}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#fdb813"},{saturation:"6"},{lightness:"65"},{gamma:"0.75"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.fill",stylers:[{visibility:"on"},{hue:"#daff00"},{lightness:"99"},{saturation:"-56"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{visibility:"on"},{hue:"#c3ff00"},{saturation:"-74"},{lightness:"58"},{gamma:"4.44"},{weight:"0.92"}]},{featureType:"poi",stylers:[{hue:"#00FF6A"},{saturation:-5.1},{lightness:15.2},{gamma:1}]}],//map.setOptions({styles:styles});

//Constructor creates a new map - only center and zoom are required
    map = new google.maps.Map(document.getElementById('map'), {
      center: derby,
           //maximum zoom - how much detail
          zoom:12,
          //displays a pan control for panning the map
          panControl:true,
          //displays a slider or "+/-" buttons to control the zoom level of the map
          zoomControl:true,
          //picks the best zoom control based on device and map size
          zoomControlOptions: {
          style:google.maps.ZoomControlStyle.DEFAULT
          },
          //let the user toggle between map types (roadmap and satellite)
          mapTypeControl:false,
          //displays a map scale element
          scaleControl:false,
          //displays a Pegman icon which can be dragged to the map to enable Street View
          streetViewControl:true,
          //displays a thumbnail overview map reflecting the current map viewport within a wider area
          overviewMapControl:true,
          //displays a small circular icon which allows you to rotate maps
          rotateControl:true,
          //if it is false enables default controls
          disableDefaultUI:false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: styles,

    });

    var locations = [
      {title: 'Derby Silk Mill', location: {lat: 52.925690, lng: -1.475733}},
      {title: 'Derby Museum and Art Gallery', location: {lat: 52.923039, lng: -1.480145}},
      {title: 'Markeaton Park', location: {lat: 52.933525, lng: -1.505240}},
      {title: 'Elvaston Castle Country Park', location: {lat: 52.892102, lng: -1.387390}},
      {title: 'Alvaston Park', location: {lat: 52.904866, lng: -1.438370}},
      {title: 'Derby River Gardens', location: {lat: 52.922866, lng: -1.438370}}
    ];

    var largeInfowindow = new google.maps.InfoWindow();

//listing marker icon
var defaultIcon = makeMarkerIcon('0B6623');

//marker icon when the user hover the marker
var highlightedIcon = makeMarkerIcon('50C878');

//Create a new lat lng balance instance which captures the southwest and northeast corners of the viewport
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++){
//Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
//Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        position: position,
        title: title,
        icon: defaultIcon,
        animation: google.maps.Animation.DROP,
        id : i 
      });

      //Push the marker to our array of markers
      markers.push(marker);
      //Extend the boundaries of the map for each marker
      bounds.extend(marker.position);
      //Create an onclick event to open an infowindow at each marker
      marker.addListener('click', function(){
        populateInfoWindow (this, largeInfowindow);
      });

      marker.addListener('mouseover', function(){
        this.setIcon(highlightedIcon);
      });

      marker.addListener('mouseout', function(){
        this.setIcon(defaultIcon);
      });
    }

//Event listeners to show and hide the places
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);

//This function populates the infowindow when the marker is clicked.
//We'll only allow one infowindow which will open at the marker that is clicked, and populate based on that marker's position
    function populateInfoWindow(marker, infowindow){
//Check to make sure the infowindow is not already opened on this marker
      if (infowindow.marker != marker){
        infowindow.setContent('');
        infowindow.marker = marker;
        //Make sure the marker property is cleared if the infowindow is closed
        infowindow.addListener('closeclick', function(){
          infowindow.marker = null;
        });

//Create a new infowindow service
      var streetViewService = new google.maps.StreetViewService();
//This service needs to get the panorama image based on the closest location to the marker
//and needs to find out which way to point the camera, the heading and the pitch
      var radius = 100;


      function getStreetView(data, status){
        if (status == google.maps.StreetViewStatus.OK){
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
          infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch:30
            }
          };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        }else{
          infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No StreetView Found</div>');
        }
      }
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      infowindow.open(map, marker);
      }
    }
    //This function will loop through the markers array and display them all
      function showListings (){
        var bounds = new google.maps.LatLngBounds();
        //Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++){
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }

      //This function will loop through the markers array and hide them all
      function hideListings (){
        for (var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }
      }

      function makeMarkerIcon(markerColor){
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
          new google.maps.Size(21,34),
          new google.maps.Point(0,0),
          new google.maps.Point(10,34),
          new google.maps.Size(21,34)
          );
        return markerImage;
      }
}

