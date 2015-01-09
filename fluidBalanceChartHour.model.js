define(['ko','lodash'], function (ko, _) {
  var fluidBalanceChartHour = function(hourDesc, previousHour) {
    var self = this, decimalPlaces = 0;

    self.hourDesc = hourDesc;
    self.previousHourDesc = (previousHour) ? previousHour.hourDesc : "";

    // Route IN
    self.inReadings = ko.observableArray([]);
    self.totalIn = ko.computed(function() {
      var sum = 0;
      self.inReadings().forEach(function(reading) {
        sum += parseFloat(reading.total());
      });
      return sum;
    });

    self.runningTotalIn = ko.computed(function() {
      if(previousHour) {
        return (parseFloat(previousHour.runningTotalIn())+parseFloat(self.totalIn()));
      }
      return self.totalIn();
    });

    // Irrigation Route IN
    self.irrigationInReadings = ko.observableArray([]);
    self.totalIrrigationIn = ko.computed(function() {
      var sum = 0;
      self.irrigationInReadings().forEach(function(reading) {
        sum += parseFloat(reading.total());
      });
      return sum;
    });

    self.runningTotalIrrigationIn = ko.computed(function() {
      if(previousHour) {
        return (parseFloat(previousHour.runningTotalIrrigationIn())+parseFloat(self.totalIrrigationIn()));
      }
      return self.totalIrrigationIn();
    });

    // Irrigation Route Out
    self.irrigationOutReadings = ko.observableArray([]);
    self.totalIrrigationOut = ko.computed(function() {
      var sum = 0;
      self.irrigationOutReadings().forEach(function(reading) {
        sum += parseFloat(reading.total());
      });
      return sum;
    });

    self.runningTotalIrrigationOut = ko.computed(function() {
      if(previousHour) {
        return (parseFloat(previousHour.runningTotalIrrigationOut())+parseFloat(self.totalIrrigationOut()));
      }
      return self.totalIrrigationOut();
    });

    // Irrigation Balance
    self.totalIrrigationBalance = ko.computed(function() {
      return (parseFloat(self.totalIrrigationOut())-(parseFloat(self.totalIrrigationIn())));
    });

    self.runningTotalIrrigationBalance = ko.computed(function() {
      return (previousHour)
        ? (parseFloat(previousHour.runningTotalIrrigationBalance())+parseFloat(self.totalIrrigationBalance()))
        : self.totalIrrigationBalance();  
    });

    // Route Out
    self.outReadings = ko.observableArray([]);
    self.totalOut = ko.computed(function() {
      var sum = 0;
      self.outReadings().forEach(function(reading){
        sum += parseFloat(reading.total());
      });      
      return sum;
    });

    self.totalOutIncludingIrrigationBalance = ko.computed(function() {
      return parseFloat(self.totalOut()) + parseFloat(self.totalIrrigationBalance());
    });

    self.totalUrineOut = ko.computed(function() {
      var sum = 0;
      self.outReadings().forEach(function(reading){
        if (reading.route && reading.route.routeCategory === "urine")
          sum += parseFloat(reading.total());
      });

      return sum;
    });

    self.runningTotalOut = ko.computed(function() {
      return (previousHour)
        ? (parseFloat(previousHour.runningTotalOut())+parseFloat(self.totalOut()))
        : self.totalOut();  
    });


    self.runningTotalOutIncludingIrrigationBalance = ko.computed(function() {
      return (previousHour)
        ? (parseFloat(previousHour.runningTotalOutIncludingIrrigationBalance())+parseFloat(self.totalOutIncludingIrrigationBalance()))
        : self.totalOutIncludingIrrigationBalance();  
    });

    // Combined
    self.total = ko.computed(function() {
      return (parseFloat(self.totalIn())-parseFloat(self.totalOut()));
    });

    self.totalIncludingIrrigationBalance = ko.computed(function() {
      return parseFloat(self.total()) - parseFloat(self.totalIrrigationBalance());
    });

    self.runningTotal = ko.computed(function() {
      return (previousHour) 
        ? (parseFloat(previousHour.runningTotal())+parseFloat(self.total()))
        : self.total();
    });

    self.runningTotalIncludingIrrigationBalance = ko.computed(function() {
      return (previousHour) 
        ? (parseFloat(previousHour.runningTotalIncludingIrrigationBalance())+parseFloat(self.totalIncludingIrrigationBalance()))
        : self.totalIncludingIrrigationBalance();
    });
  };

  return fluidBalanceChartHour;
});
