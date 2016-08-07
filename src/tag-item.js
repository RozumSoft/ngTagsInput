'use strict';

/**
 * @ngdoc directive
 * @name tiTagItem
 * @module ngTagsInput
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput directive.
 */
tagsInput.directive('tiTagItem', function(tiUtil) {
    return {
        restrict: 'E',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '='
        },
        link: function(scope, element, attrs, tagsInputCtrl) {
            var tagsInputCtrl = element.parent().controller('tagsInput');
            if(tagsInputCtrl) {
                var tagsInput = tagsInputCtrl.registerTagItem(),
                    options = tagsInput.getOptions();

                scope.$$template = options.template;
                scope.$$removeTagSymbol = options.removeTagSymbol;

                scope.$getDisplayText = function () {
                    return tiUtil.safeToString(scope.data[options.displayProperty]);
                };
                scope.$removeTag = function () {
                    tagsInput.removeTag(scope.$index);
                };

                scope.$watch('$parent.$index', function (value) {
                    scope.$index = value;
                });
            }
        }
    };
});
