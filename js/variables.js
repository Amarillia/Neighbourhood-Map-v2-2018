var map;

var DERBY = { lat: 52.92277, lng: -1.47663 };


var locations = [
    { title: 'Derby Silk Mill', location: { lat: 52.9254831, lng: -1.4756791 } },
    { title: 'Derby Museum and Art Gallery', location: { lat: 52.923039, lng: -1.480145 } },
    { title: 'Markeaton Park', location: { lat: 52.933525, lng: -1.505240 } },
    { title: 'Elvaston Castle Country Park', location: { lat: 52.892102, lng: -1.387390 } },
    { title: 'Alvaston Park', location: { lat: 52.9048659, lng: -1.438370 } },
    { title: 'Derby River Gardens', location: { lat: 52.922866, lng: -1.471988 } },
    { title: 'Oxygen Freejumping Derby', location: { lat: 52.9161095, lng: -1.444648 } },
    { title: 'Hollywood Bowl Derby', location: { lat: 52.919967, lng: -1.473333 } },
    { title: 'Rollerworld of Derby', location: { lat: 52.937180, lng: -1.464893 } },
    { title: 'The Climbing Unit', location: { lat: 52.924742, lng: -1.450858 } },
    { title: 'Paint a Pot', location: { lat: 52.934804, lng: -1.505525 } }
];

var polygon = null;

var Loc = function (data) {
    this.title = data.title;
    this.location = data.location;
    this.marker = data.marker;
};

