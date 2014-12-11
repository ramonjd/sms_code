/* APP MODULE */

angular.module('app', [
  'app.services',
  'ngRoute'
])




/* CONFIG / ROUTES */

.config(function myAppConfig($routeProvider, $locationProvider) {
  'use strict';
  
  $routeProvider.
    when('/', {
      templateUrl: '/views/reset.tpl.html',
      controller: 'AppCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

})






/* APP CONTROLLER */

.controller( 'AppCtrl', function AppCtrl($scope, resetService, $log) {
  
  $log.info('AppCtrl ::');
  $log.info('   ___           ___  ');
  $log.info('  ||__  ||\\/|| ||__  ');
  $log.info('   __|| ||  ||  __||  ');
  $log.info('  ..................  ');
  $log.info('  Hint:            ');
  $log.info('  Today\'s date    ');
  $log.info('  ..................  ');
  
  

  $scope.codeData = {
    isValid : null
  };
  
  // set up listener
  resetService.listen($scope, function(data){
        if (angular.isObject(data)) {
          if (data.errorcode) {
            $log.warn('resetPanel:: server returned error');
            $scope.codeData.isValid = false;
          }

          if (data.status) {
            $log.info('resetPanel:: server returned success');
            $scope.codeData.isValid = true;
          }  
        }
  });
})


/* FORM DIRECTIVE - UI */

// now, normally, I'd toss this into its own module and 
// add it as a dependency to the page controller, but who has time?

.directive('resetForm', ['$log', 'resetService', function($log, resetService) {
  return {
    restrict : 'A',
    templateUrl: '/views/form.tpl.html',
    scope : {
      codeData: '='
    },
    link: function(scope, element, attrs){
      
      var input = element.find('input').eq(0),
          formCtrl = input.controller('form');
      
            scope.code = null;
      
      // only submit on valid input value
      // why a promise? because we might want to do some UI stuff after the call
       scope.submitForm = function(){
         resetService.password(scope.code);
       };
      
      // restore form
      scope.resetForm = function(){
        if ((formCtrl.$submitted === true && scope.codeData.isValid === false) || scope.codeData.isValid === true) {
            formCtrl.$setPristine();
            formCtrl.$setUntouched();
          } 
      };
    }
  };
}]);


/* BOOTSTRAP */
// for control freaks
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});