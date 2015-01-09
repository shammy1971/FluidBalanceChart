define(['jquery', 'ko', 'globals', 'fluidBalanceChart.model','fluidBalanceChartRoute.model','fluidBalanceChartReading.model', 'jquery.flot'], 
  function ($, ko, globals, fluidBalanceChart, fluidBalanceChartRoute, fluidBalanceChartReading) {
    var fluidBalanceChartVm = function () {
      var self = this;

      self.fluidBalanceChart = ko.observable();
      self.chartStatus = ko.observable();
      self.isLoading = ko.observable(false);
      self.isSaving = ko.observable(false);
      self.routesOffset = 2;
      self.reading = ko.observable();
      self.routeIn = ko.observable();
      self.routeOut = ko.observable();
      self.entry = ko.observable();
      self.isNewReading = ko.observable(false);
      self.displayReadingPopout = ko.observable(false);
      self.displayRouteInPopout = ko.observable(false);
      self.displayRouteOutPopout = ko.observable(false);
      self.alternativeReadings = ko.observableArray(['Select','Completed','Replaced','TWOC', 'OTT', 'Removed', 'PU','NB ng','NB Peg', 'NBM', 'Bag burst', 'Bag leaking']);
      self.routeInNames = ko.observableArray(['Select','Enteral','IV Drug Infusions','IV Infusions','IV Drug','IV Drug + Flush','Blood Components & Products']);
      self.routeInSubNames = ko.observableArray(['Select', 'red cells', 'platelets','FFP', 'Octaplas','cryoprecipitate', '']);
      //self.routeInSubNames = ko.observableArray(['Select','5% Dextrose','Normal Saline 0.9%','Dextrose Saline', 'Hartmann’s', 'Glucose10%']);

      self.routeOutNames = ko.observableArray(['Select','Urinary Catheter', 'Nephrostomy tube','Bladder Irrigation output','Vomit','NG aspirate','Ng drainage','Drains']);
      self.routeOutSubNames = ko.observableArray(['Select','Redivac','Pigtail','Ascitic','Corrugated','T-Tube']);


      self.changeChartType = function() {
        if (self.fluidBalanceChart() && self.fluidBalanceChart().chartType())
          self.fluidBalanceChart().chartType()
      };

      self.changeChartIrrigation = function() {
        if(self.fluidBalanceChart().hasIrrigation())
          self.fluidBalanceChart().hasIrrigation(false);
        else
          self.fluidBalanceChart().hasIrrigation(true);
      };

      self.init = function () {
        self.populate();
        self.doSomethingInteresting();
        self.updateCharts();
      };

      self.populate = function(apiUrl) {
        self.chartStatus('loading...');
        self.isLoading(true);
        self.fluidBalanceChart(new fluidBalanceChart());
        self.isLoading(false);
        self.chartStatus('');
      };

      self.doSomethingInteresting = function() {
        // observables

        // properties
        self.fluidBalanceChart().weight = 80;
        self.fluidBalanceChart().weightIsEst(true);
        self.fluidBalanceChart().workingWeight(78);
        self.fluidBalanceChart().aim("To increase hydration..");
        self.fluidBalanceChart().reason("Hydration low during tests");
        self.fluidBalanceChart().chartType("Paedaitrict");
        self.fluidBalanceChart().addRoute({
          pveId: '0',
          routeName: 'Oral',
          routeDesc: '',
          routeType: 'routeIn',
          routeSubType: '',          
          isIV: false
        });
        self.fluidBalanceChart().addRoute({
          pveId: '0',
          routeName: 'Urine (void)',
          routeDesc: '',
          routeType: 'routeOut',
          routeSubType: '',          
          routeCategory: 'urine',
          isIV: false
        });
        self.fluidBalanceChart().addRoute({
          pveId: '0',
          routeName: 'Stool',
          routeDesc: '',
          routeType: 'routeOut',
          routeSubType: '',          
          isIV: false
        });
        self.fluidBalanceChart().addIrrigation();
      };

      self.updateCharts = function() {
        self.updateStandardChart();
        self.updateIrrigationChart();
      };


      self.updateStandardChart = function(){
        var chartData = {hours: [], inputs: [], outputs: [], urineOutputs: [], irrigations: [], totals: []};
        var numOfHours = self.fluidBalanceChart().hours().length;
        var lastRecord = self.fluidBalanceChart().hours()[numOfHours-1];
        var firstAndLastHourDesc = lastRecord.hourDesc;

        var j =0;
        for(var i=0; i < self.fluidBalanceChart().hours().length; i++) {
          var hour = self.fluidBalanceChart().hours()[i];
          chartData.hours.push([i,hour.previousHourDesc ? hour.previousHourDesc : firstAndLastHourDesc]);
          chartData.inputs.push([i, hour.totalIn()]);
          chartData.outputs.push([i, -hour.totalOut()]);  
          chartData.urineOutputs.push([i,-hour.totalUrineOut()]);
          chartData.totals.push([i, hour.runningTotalIncludingIrrigationBalance()]);
        };
        // last hour
        chartData.hours.push([numOfHours, firstAndLastHourDesc]);
        chartData.totals.push([numOfHours, lastRecord.runningTotalIncludingIrrigationBalance()]);


        $.plot(
          "#fluidBalanceChart",  
          [ 
            {color: '#3399FF',  data: chartData.inputs,       bars:  {show:true}}, 
            {color: '#FFCC00',  data: chartData.outputs,      bars:  {show:true}}, 
            {color: '#FF9900',  data: chartData.urineOutputs, bars:  {show:true}}, 
            {color: '#666666',  data: chartData.totals,       lines: {show:true}} 
          ],
          {
            xaxis: { ticks: chartData.hours }
          });
      };

      self.updateIrrigationChart = function(){
        var chartData = {hours: [], inputs: [], outputs: [], urineOutputs: [], irrigations: [], totals: []};
        var numOfHours = self.fluidBalanceChart().hours().length;
        var lastRecord = self.fluidBalanceChart().hours()[numOfHours-1];
        var firstAndLastHourDesc = lastRecord.hourDesc;

        var j =0;
        for(var i=0; i < self.fluidBalanceChart().hours().length; i++) {
          var hour = self.fluidBalanceChart().hours()[i];
          chartData.inputs.push([j, hour.totalIn()]);
          chartData.totals.push([j, hour.runningTotalIncludingIrrigationBalance()]);
          chartData.hours.push([j++,hour.previousHourDesc ? hour.previousHourDesc : firstAndLastHourDesc]);
//          chartData.hours.push([j++,"");

          chartData.outputs.push([j, -hour.totalOut()+hour.totalUrineOut()]);
          chartData.hours.push([j++,""]);
  
          chartData.urineOutputs.push([j,-hour.totalUrineOut()]);
          chartData.hours.push([j++,""]);
  
          chartData.irrigations.push([j,-hour.totalIrrigationBalance()]);
          chartData.hours.push([j++,""]);
        };
        // last hour
        chartData.hours.push([j, firstAndLastHourDesc]);
        chartData.totals.push([j, lastRecord.runningTotalIncludingIrrigationBalance()]);


        $.plot(
          "#fluidBalanceChartIrrigation",  
          [ 
            {color: '#3399FF',  data: chartData.inputs,       bars:  {show:true}}, 
            {color: '#FFCC00',  data: chartData.outputs,      bars:  {show:true}}, 
            {color: '#FF9900',  data: chartData.urineOutputs, bars:  {show:true}}, 
            {color: '#FF6600',  data: chartData.irrigations,  bars:  {show:true}}, 
            {color: '#666666',  data: chartData.totals,       lines: {show:true}} 
          ],
          {
            xaxis: { ticks: chartData.hours }
          });
      };      

      self.openReading = function (entry, reading) {
        self.displayReadingPopout(true);
        self.isNewReading(false);
        self.reading(reading);
        self.entry(entry);
      };
      
      self.addReading = function (entry) {
        self.displayReadingPopout(true);
        self.isNewReading(true);
        self.reading(new fluidBalanceChartReading());
        self.entry(entry);
      };
      
      self.saveReading = function () {
        self.displayReadingPopout(false);

        if(self.isNewReading())
        {
          self.entry().readings.push(self.reading());
        }
        self.updateCharts();
        globals.successMessage(null, "Saved Successfully :)");
      };

      self.closeReading = function () {
        self.displayReadingPopout(false);
      };

      self.addRouteIn = function (entry) {
        self.displayRouteInPopout(true);
        self.routeIn(new fluidBalanceChartRoute({routeType: 'routeIn'}));
      };
      
      self.saveRouteIn = function () {
        self.displayRouteInPopout(false);

        self.fluidBalanceChart().addRoute(self.routeIn());
      };

      self.closeRouteIn = function () {
        self.displayRouteInPopout(false);
      };

      self.addRouteOut = function (entry) {
        self.displayRouteOutPopout(true);
        self.routeOut(new fluidBalanceChartRoute({routeType: 'routeOut'}));
      };
      
      self.saveRouteOut = function () {
        self.displayRouteOutPopout(false);

        self.fluidBalanceChart().addRoute(self.routeOut());
      };

      self.closeRouteOut = function () {
        self.displayRouteOutPopout(false);
      };
      self.saveChartInfo = function () {
        globals.successMessage(null, "Saved Successfully :)");
      };
      self.changeToAdult  = function() {
        self.fluidBalanceChart().chartType("Adult");
        globals.successMessage(null, "Chart changed to Adult type");
      };
      
      self.changeToPeadiatric  = function() {
        self.fluidBalanceChart().chartType("Paediatric");
        globals.successMessage(null, "Chart changed to Paediatric type");
      };
      
      self.init();
    };

    return fluidBalanceChartVm;
});
