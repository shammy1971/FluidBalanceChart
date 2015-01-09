define(['ko'], function (ko) {
  var fluidBalanceChartRoute = function(data) {
    var self = this;
    data = data || [];

    self.pveId = data.pveId;
    self.routeName = data.routeName;
    self.routeType = data.routeType;
    self.routeSubType = data.routeSubType;
    self.routeDescription = data.routeDesc;
    self.routeCategory = data.routeCategory;
    self.isIV = ko.observable(data.isIV);

    self.entries = ko.observable([]); // index mirrors in

    self.total = ko.computed(function() {
      var sum = 0;
      self.entries().forEach(function(entry) {
        sum += parseFloat(entry.total());
      });
      return sum;
    });
  };

  return fluidBalanceChartRoute;
});
