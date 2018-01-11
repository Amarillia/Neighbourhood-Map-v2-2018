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
      }
