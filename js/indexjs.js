angular.module('StarterApp',['ngMaterial'])
 .config(function($mdThemingProvider) {
  })
 .controller('AppCtrl', ['$scope', '$interval', function($scope, $interval) {
    var self = this, j= 0, counter = 0;
    self.mode = 'query';
    self.activated = true;
    self.determinateValue = 30;

    self.modes = [ ];
    /**
     * Turn off or on the 5 themed loaders
     */
    self.toggleActivation = function() {
        if ( !self.activated ) self.modes = [ ];
        if (  self.activated ) {
          j = counter = 0;
          self.determinateValue = 30;
        }
    };
    $interval(function() {
      self.determinateValue += 1;
      if (self.determinateValue > 100) self.determinateValue = 100;
      /*
        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars
        if ( (j < 2) && !self.modes[j] && self.activated ) {
          self.modes[j] = (j==0) ? 'buffer' : 'query';
        }
        if ( counter++ % 4 == 0 ) j++;
        // Show the indicator in the "Used within Containers" after 200ms delay
        if ( j == 2 ) self.contained = "indeterminate";
    }, 100, 0, true);
    $interval(function() {
      self.mode = (self.mode == 'query' ? 'determinate' : 'query');
    }, 7200, 0, true);*/
});
  }]);
