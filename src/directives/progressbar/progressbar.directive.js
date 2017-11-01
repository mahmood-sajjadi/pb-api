const progressbar = () => {
  'ngInject';

  return {
    restrict: 'E',
    replace: true,
    scope: {
      limit: '@',
      value: '='
    },
    template: `
<div class="progressbar-holder">
    <div class="progress" ng-class="{overlimit: overlimit}" ng-style="progress"></div>
    <span class="progress-value">{{progress.width}}</span>
</div>
    `,    
    link(scope, elem, attrs) {

      scope.progress = {
        width: '0%'
      };
      scope.overlimit = false;
      const limit = Number(scope.limit);
      scope.$watch('value', function (v) {
        const value = Number(v);
        if (limit) {
          const val = 100.0 * value / limit;
          scope.overlimit = val > 100;
          scope.progress.width = parseInt(val) + '%';
        }
      });
    }
  };
};

export default progressbar;