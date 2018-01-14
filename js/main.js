var map;

// These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.        
var locations = [
  {title: 'Derby Silk Mill', location: {lat: 52.925690, lng: -1.475733}},
  {title: 'Derby Museum and Art Gallery', location: {lat: 52.923039, lng: -1.480145}},
  {title: 'Markeaton Park', location: {lat: 52.933525, lng: -1.505240}},
  {title: 'Elvaston Castle Country Park', location: {lat: 52.892102, lng: -1.387390}},
  {title: 'Alvaston Park', location: {lat: 52.904866, lng: -1.438370}},
  {title: 'Derby River Gardens', location: {lat: 40.7180628, lng: -1.438370}}
];

var markers = [];

function initMap() {
        var derby = {lat: 52.92277, lng: -1.47663};
        var // Create a styles array to use with the map.
              styles=[{featureType:"road",stylers:[{hue:"#FFBB00"},{saturation:30},{lightness:30},{gamma:1}]},{featureType:"road.highway",stylers:[{hue:"#FFC200"},{saturation:-62},{lightness:46},{gamma:1}]},{featureType:"road.arterial",stylers:[{hue:"#FF0300"},{saturation:-100},{lightness:51.2},{gamma:1}]},{featureType:"road.local",stylers:[{hue:"#FF0300"},{saturation:-100},{lightness:52},{gamma:1}]},{featureType:"water",stylers:[{hue:"#747ca9"},{saturation:-20},{lightness:2.4},{gamma:1}]},{featureType:"landscape",elementType:"all",stylers:[{hue:"#FFBB00"},{saturation:43.400000000000006},{lightness:37.599999999999994},{gamma:1}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#fdb813"},{saturation:"6"},{lightness:"65"},{gamma:"0.75"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.fill",stylers:[{visibility:"on"},{hue:"#daff00"},{lightness:"99"},{saturation:"-56"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{visibility:"on"},{hue:"#c3ff00"},{saturation:"-74"},{lightness:"58"},{gamma:"4.44"},{weight:"0.92"}]},{featureType:"poi",stylers:[{hue:"#00FF6A"},{saturation:-5.1},{lightness:15.2},{gamma:1}]}],//map.setOptions({styles:styles});
        // Constructor creates a new map - only center and zoom are required.
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
        var marker = new google.maps.Marker({
          position: derby,
          map: map
        });

      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
      
        // The following group uses the location array to create an array of markers on initialize.
        var highlightedIcon = makeMarkerIcon('0B6623');
        var defaultIcon = makeMarkerIcon('50C878');
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);

          marker.addListener('mouseover', function() {
              this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
              this.setIcon(defaultIcon);
          });
      }

}
