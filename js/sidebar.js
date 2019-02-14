var polygon = null;
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var ViewModel = function () {
    var self = this;

    self.listLoc = ko.observableArray();

    locations.forEach(function (locItem) {
        self.listLoc.push(new Loc(locItem));
    });

    self.filter = ko.observable('');

    self.filteredItems = ko.computed(function () {
        var filter = self.filter().toLowerCase();

        if (!filter) {
            ko.utils.arrayForEach(self.listLoc(), function (item) {
                item.marker.setVisible(true);
            });
            return self.listLoc();
        } else {
            return ko.utils.arrayFilter(self.listLoc(), function (item) {
                // set all markers visible (false)
                var result = (item.title.toLowerCase().search(filter) >= 0);
                item.marker.setVisible(result);
                return result;
            });
        }
    });

    self.setLoc = function (clickedLoc) {
        clickedLoc.marker.setAnimation(google.maps.Animation.BOUNCE);

        // var li = document.getElementById("menu");
        var listItem = clickedLoc.title;
        sendsugg(listItem);
        console.log(listItem);

        function sendsugg(sugg) {
            var http2 = new XMLHttpRequest();
            http2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200)
                    showsugg(this);
            };
            var clearify = sugg.split(' ').join('_');
            http2.open("GET", "proxy2.php?a="+ clearify,true);
            http2.send(null);
        }


    };
function showsugg(sendsugg) {
    document.getElementById("explain").innerHTML = getsugg.responseText;
}

};