//baseado em: https://github.com/akatov/angular-contenteditable

angular.module('contenteditable', ['ngSanitize'])
.directive('contenteditable', function($sce) {
  return {
     restrict: 'A',
     require: '?ngModel', // get a hold of NgModelController
     link: function(scope, element, attrs, ngModel) {
       if (!ngModel) return;

       var editEvent = attrs.editEvent;
       var editEventDelay = attrs.editEventDelay || 500;
       var timer;

       //view -> model
       element.bind('input', function(e) {
         scope.$apply(function() {
           ngModel.$setViewValue(element.html());
           if (editEvent) {
             clearTimeout(timer);
             timer = setTimeout(function () {
               scope.$emit(editEvent);
             }, editEventDelay);
           }
         });
       });

       //model -> view
      var oldRender = ngModel.$render;
      ngModel.$render = function() {
        if (!!oldRender) {
          oldRender();
        }
        element.html(ngModel.$viewValue || '');
      };
     }
   };
});
