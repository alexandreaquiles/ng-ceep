angular.module('focusOn', [])
.directive('focusOn', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if(attrs.focusOn) {
        scope.$on(attrs.focusOn, function () {
          element[0].focus();
        });
      }
    }
  };
});
