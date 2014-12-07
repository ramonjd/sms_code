angular.module('app.services', [
  'app.constants'
]).
factory('resetService', ['$http', '$q', '$log', 'REST_URLS', function($http, $q, $log, REST_URLS) {
  'use strict'; 
  
  /* PRIVATE  */
  
  // only expose data, not what's under the bonnet!
  var success = function(res){
    $log.info('resetService:: $http success');
    return res.data ;
  },
  
  // make a frankenstein error object if need be. it's alive! 
  error = function(res){
      $log.error('resetService:: $http error');
      if (!angular.isObject( res.data ) || !res.data.error) {
          return $q.reject('Sweet error message.');
        }
      return $q.reject(res.data.error);  
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
    password: password
  };
  
}]);