var app = angular.module('StarterApp', ['ngMaterial','ngAnimate','ngTouch','ui.bootstarp']);
app.config(function($mdThemingProvider) {
  })

app.controller('AppCtrl', ['$scope', '$interval', function($scope, $interval){
   var self = this, j= 0, counter = 0;
    self.mode = 'query';
    self.activated = true;
    self.determinateValue = 10;
   self.modes = [ ];
   self.toggleActivation = function() {
        if ( !self.activated ) self.modes = [ ];
        if (  self.activated ) {
          j = counter = 0;
          self.determinateValue = 10;
        }
    };
    $interval(function() {
      self.determinateValue += 1;
      if (self.determinateValue > 100) self.determinateValue =100;
    });
      
        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars
     /*   if ( (j < 2) && !self.modes[j] && self.activated ) {
          self.modes[j] = (j==0) ? 'buffer' : 'query';
        }
        if ( counter++ % 4 == 0 ) j++;
        // Show the indicator in the "Used within Containers" after 200ms delay
        if ( j == 2 ) self.contained = "indeterminate";
    }, 100, 0, true);
    $interval(function() {
      self.mode = (self.mode == 'query' ? 'determinate' : 'query');
    }, 7200, 0, true);*/

 var INTERVAL = 3000,
        slides = [{id:"img00", src:"./img/img00.jpg"},
        {id:"img01", src:"./img/img01.jpg"},
        {id:"img02", src:"./img/img02.jpg"},
        {id:"img03", src:"./img/img03.jpg"},
        {id:"img04", src:"./img/img04.jpg"}];
  
  function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        QueueService.loadManifest(slides);
    }

    $scope.$on('queueProgress', function(event, queueProgress) {
        $scope.$apply(function(){
            $scope.progress = queueProgress.progress * 100;
        });
    });

    $scope.$on('queueComplete', function(event, slides) {
        $scope.$apply(function(){
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = false;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'fade-in-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    loadSlides();
  }]);
  
app.animation('.slide-animation',function(){
  return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
             addClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });
