requirejs.config({
  paths: {
    //EXTERNAL LIBRARIES
    'jquery': '//code.jquery.com/jquery-1.9.1.min',
    'jquery-2': '//code.jquery.com/jquery-2.1.1.min',
    'jquery-ui': '//code.jquery.com/ui/1.9.2/jquery-ui',
    'jquery.floatThead': '//cdnjs.cloudflare.com/ajax/libs/floatthead/1.2.8/jquery.floatThead-slim.min',
    'jquery.flot': '//cdnjs.cloudflare.com/ajax/libs/flot/0.8.2/jquery.flot.min',
    'jquery.blockui': '//cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.66.0-2013.10.09/jquery.blockUI.min',
    'ko': '//cdnjs.cloudflare.com/ajax/libs/knockout/3.0.0/knockout-min',
    'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
    'moment': '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment',
    'underscore':  '//jashkenas.github.io/underscore/underscore-min',
    'lodash':  '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
    'toastr': '//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/js/toastr.min',
    'globals': 'globals',

    //MODELS
    'fluidBalanceChart.model': 'fluidBalanceChart.model',
    'fluidBalanceChartEntry.model': 'fluidBalanceChartEntry.model',
    'fluidBalanceChartHour.model': 'fluidBalanceChartHour.model',
    'fluidBalanceChartReading.model': 'fluidBalanceChartReading.model',
    'fluidBalanceChartRoute.model': 'fluidBalanceChartRoute.model',

    //VIEWMODELS
    'fluidBalanceChart.viewmodel': 'fluidBalanceChart.viewmodel',
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'jquery-ui': {
      exports: '$',
      deps: ['jquery']
    },
    'jquery.floatThead': {
      deps: ['jquery', 'underscore']
    },
    'jquery.flot': {
      deps: ['jquery'],
      exports: '$.plot'
    },
    'jquery.blockui': {
      deps: ['jquery']
    },
    'ko': {
      deps: ['jquery']
    },
    'bootstrap' : { 
      deps :['jquery'] 
    }    
  }
});

require(['ko', 'fluidBalanceChart.viewmodel'], function (ko, fluidBalanceChartVm) {
  ko.applyBindings(new fluidBalanceChartVm());  
});
require(['jquery', 'toastr', 'jquery.flot', 'jquery-ui', 'jquery.floatThead', 'bootstrap'], function($, toastr) { 
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $("table.table").floatThead();
  });
  // toastr global options
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "50",
    "hideDuration": "50",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
});
