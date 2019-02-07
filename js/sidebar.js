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
    };
};