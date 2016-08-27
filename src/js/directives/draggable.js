angular.module('dragAndDrop', [])
.directive('draggable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      if (!attrs.draggableList) {
        throw new Error('Please define a draggable-list attribute on the draggable.');
      }
      if (!attrs.draggableItem) {
        throw new Error('Please define a draggable-item attribute on the draggable.');
      }

      var draggableList = attrs.draggableList;
      var draggableItem = attrs.draggableItem;
      var dragClass = attrs.dragClass || 'drag-source';
      var dropClass = attrs.dropClass || 'drop-target';
      var dropEvent = attrs.dropEvent || 'drop-done';

      element.on('dragstart', function (e) {
        element.addClass(dragClass);
        e.dataTransfer.effectAllowed = 'move';
        var source = scope.$eval(draggableItem);
        e.dataTransfer.setData('application/x.dnditem+json', angular.toJson(source));
      });

      element.on('dragend', function () {
        element.removeClass(dragClass);
      });

      element.on('dragenter', function () {
        element.addClass(dropClass);
      });

      element.on('dragleave', function () {
        element.removeClass(dropClass);
      });

      element.on('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      element.on('drop', function (e) {
        element.removeClass(dropClass);
        var source = angular.fromJson(e.dataTransfer.getData('application/x.dnditem+json'));
        var target = scope.$eval(draggableItem);
        if (!angular.equals(source, target)) {
          var list = scope.$eval(draggableList);
          var sourceIndex = findSourceIndex(list, source);
          var targetIndex = list.indexOf(target);
          list[sourceIndex] = target;
          list[targetIndex] = source;
          scope.$emit(dropEvent);
        }
      });
    }
  };

  function findSourceIndex (list, source) {
    var sourceIndex = -1;
    angular.forEach(list, function (item, i) {
      if(angular.equals(source, item)) {
        sourceIndex = i;
      }
    });
    return sourceIndex;
  }
});
