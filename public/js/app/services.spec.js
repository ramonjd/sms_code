/* TESTS FOR MODULE:APP */

describe('app.services: ', function() {

  var resetService,
      $httpBackend,
      deferred,
      successHandler,
      errorHandler;

  beforeEach(module('app.services'));

    beforeEach(inject(function(_$injector_) {
      $httpBackend = _$injector_.get('$httpBackend');
      resetService = _$injector_.get('resetService');
    }));
  
    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have xpected api',  function () {
      expect(typeof resetService.password).toBe('function');
    });  
  
    it('should return expected data for success',  function () {
      $httpBackend.expectPOST('/api/reset', {code :  '1'}).respond('1');
      successHandler = jasmine.createSpy('success');
      deferred = resetService.password('1');
      deferred.then(successHandler);
      $httpBackend.flush();
      expect(successHandler).toHaveBeenCalledWith('1');
    }); 
  
  
    it('should return promise for error with no response',  function () {
      $httpBackend.expectPOST('/api/reset', {code :  '1'}).respond(500);
      successHandler = jasmine.createSpy('success');
      errorHandler = jasmine.createSpy('error');
      deferred = resetService.password('1');
      deferred.then(successHandler, errorHandler);
      $httpBackend.flush();
      expect(errorHandler).toHaveBeenCalledWith('Sweet error message.');
    });
  
  
    it('should return promise for error with formed response',  function () {
      $httpBackend.expectPOST('/api/reset', {code :  '1'}).respond(500, {error : 'Even sweeter error message!'});
      successHandler = jasmine.createSpy('success');
      errorHandler = jasmine.createSpy('error');
      deferred = resetService.password('1');
      deferred.then(successHandler, errorHandler);
      $httpBackend.flush();
      expect(errorHandler).toHaveBeenCalledWith('Even sweeter error message!');
    });
  
 });