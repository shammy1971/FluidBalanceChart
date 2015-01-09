define(['ko', 'lodash'], function (ko, _) {
  var fluidBalanceChartReading = function(data) {
    var self = this;
    data = data || {}

    self.pveid = ko.observable(data.pveId);
    self.volume = ko.observable(data.volume);
    self.alternativeVal = ko.observable(data.alternativeVal);
    self.comment = ko.observable(data.comment);
    self.vip = ko.observable(data.vip);
    self.pressure = ko.observable(data.pressure);
    self.routeType = ko.observable(data.routeType);
  };

  return fluidBalanceChartReading;
});
