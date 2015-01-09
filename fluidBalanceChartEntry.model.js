define(['ko', 'lodash'], function (ko, _) {
  var fluidBalanceChartEntry = function(hour, route, readings, previousEntry) {
    var self = this;
    readings = readings || [];

    self.hour = hour;
    self.route = route;
    self.readings = ko.observableArray([]);

    self.init = function(){
      if(readings) {
        self.update(readings);
      }
    };   

    self.total = ko.computed(function() {
      var sum = 0;
      self.readings().forEach(function(reading) {
        if(reading.volume())
          sum += parseFloat(reading.volume());
      });
      return sum;
    }, this);
    
    self.runningTotal = ko.computed(function() {
      return (previousEntry) 
        ? (parseFloat(previousEntry.runningTotal()) + parseFloat(self.total()))
        : parseFloat(self.total());
    });

    self.update = function(data) {
      self.readings([]);
      data.forEach(function(reading){
        self.readings().push(new fluidBalanceChartReading(reading));
      });
    };

    self.init();

  };

  return fluidBalanceChartEntry;  
});
