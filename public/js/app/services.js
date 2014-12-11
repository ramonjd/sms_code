angular.module('app.services', [
  'app.constants'
]).
factory('resetService', ['$http', '$q', '$log', 'REST_URLS', '$rootScope', function($http, $q, $log, REST_URLS, $rootScope) {
  'use strict'; 
  
  /* PRIVATE  */
  
  // only expose data, not what's under the bonnet!
  var broadcast = function(msg){
    $rootScope.$broadcast('reset.password', msg);
  },
      
 success = function(res){
    $log.info('resetService:: $http success');
    broadcast(res.data);
    return res.data;
  },
  
  // make a frankenstein error object if need be. it's alive! 
  error = function(res){
      $log.error('resetService:: $http error');
      if (!angular.isObject( res.data ) || !res.data.error) {
          broadcast('Sweet error message.');
          return $q.reject('Sweet error message.');
        }
      broadcast(res.data.error);
      return $q.reject(res.data.error);  
  },
      
  listen = function($scope, callback){
    $rootScope.$on('reset.password', function (evt, args) {
      callback(args);
    });
  };  

  /* PUBLIC API */
  
  function password(codeNum) {
    // validation should have occurred by now
    var req = $http({
      method: 'post',
      data: {
          code: codeNum
      },
      url: REST_URLS.reset
    });
    
    return req.then(success, error);
  }  
  
  return {
    password: password,
    listen: listen
  };
  
}]);