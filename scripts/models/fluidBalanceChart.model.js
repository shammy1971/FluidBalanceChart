define(['ko', 'moment', 'lodash', 'fluidBalanceChartHour.model', 'fluidBalanceChartRoute.model', 'fluidBalanceChartEntry.model']
  , function (ko, moment, _, fluidBalanceChartHour, fluidBalanceChartRoute, fluidBalanceChartEntry) {
  var fluidBalanceChart = function (data) {
    var self = this;
    data = data || {};
    data.routes = data.routes || [];

    self.date = (data.date || moment()); // default today (yesterday if before midnight)
    self.startHour = data.startHour || 8; // default to 07:00
    self.hours = ko.observableArray([]);
    self.numberOfHours = data.numberOfHours || 24; // default to 24

    self.weight = data.weight;
    self.weightIsEst = ko.observable(data.weightIsEst || false);
    self.workingWeight = ko.observable(data.workingWeight);

    self.routesIn = ko.observableArray([]);
    self.routesOut = ko.observableArray([]);
    self.hasIrrigation = ko.observable(false);

    self.lastHour = ko.computed(function() {
      if(self.hours)
        return _.last(self.hours());

      return undefined;
    });

    self.aim = ko.observable(data.aim);
    self.chartType = ko.observable(data.chartType);
    self.reason = ko.observable(data.reason);

    self.init = function() {
      for(var i=0; i < self.numberOfHours; i++) {
        var previousHour = i > 0 ? self.hours()[i-1] : null;
        var hourDesc = moment(self.startHour, "HH").add(i, 'h').format("HH:mm");
        self.hours.push(new fluidBalanceChartHour(hourDesc, previousHour));
      };

      data.routes.forEach(function(route) {        
        addRoute(route);
      });
    };

    self.addIrrigation = function(data) {    
      data = data || {};

      if(self.hasIrrigation())        
        return

      // Irrigation In
      var routeIrrigationIn = new fluidBalanceChartRoute({routeType: "routeIrrigationIn"});
      var previousEntryIn;

      // Irrigation Out
      var routeIrrigationOut = new fluidBalanceChartRoute({routeType: "routeIrrigationOut"});
      var previousEntryOut;

      self.hours().forEach(function(hour) {
        // Irrigation In
        var readingsIn = _.where(data.readings, {hour: hour.hourDesc, routeType: "routeIrrigationIn"});
        var entryIn = new fluidBalanceChartEntry(hour, routeIrrigationIn, readingsIn, previousEntryIn);
        hour.irrigationInReadings.push(entryIn);
        previousEntryIn = entryIn;

        // Irrigation Out
        var readingsOut = _.where(data.readings, {hour: hour.hourDesc, routeType: "routeIrrigationOut"});
        var entryOut = new fluidBalanceChartEntry(hour, routeIrrigationOut, readingsOut, previousEntryOut);
        hour.irrigationOutReadings.push(entryOut);
        previousEntryOut = entryOut;
      });
    };

    self.addRoute = function(data) {    
      data = data || {};
      var route = new fluidBalanceChartRoute(data);
      var previousEntry;

      self.hours().forEach(function(hour) {
        var readings = _.where(data.readings, {hour: hour.hourDesc});
        var entry = new fluidBalanceChartEntry(hour, route, readings, previousEntry);

        if (route.routeType == "routeIn")
          hour.inReadings.push(entry);
        else
          hour.outReadings.push(entry);

        previousEntry = entry;
      });

      if (route.routeType == "routeIn")
        self.routesIn.push(route);
      else
        self.routesOut.push(route);
    };

    self.init();
  };

  return fluidBalanceChart;
});
