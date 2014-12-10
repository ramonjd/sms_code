'use strict';

/* TESTS FOR MODULE:APP */

describe('App: ', function() {

  var $controller, 
      $element,
      $compile,
      $scope,
      $httpBackend,
      $q,
      $log,
      deferred,
      createCtrl,
      ctrl,
      resetServiceMock,
      resetService,
      isolateScope,
      template;
  
  beforeEach(module('app'));
  
  
  describe('App: AppCtrl: ', function() {

    beforeEach(inject(function(_$injector_) {
      $scope = _$injector_.get('$rootScope');
      $controller = _$injector_.get('$controller');
      $q = _$injector_.get('$q');
      $log = _$injector_.get('$log');
      resetServiceMock = jasmine.createSpyObj('resetService', ['listen']);
      createCtrl = function() {
        return $controller('AppCtrl', {
          '$scope' : $scope,
          'resetService' : resetServiceMock,
          '$log' : $log
          
        });
      };
      ctrl = createCtrl();
    }));

    it('should have a model codeData', function(){
      expect($scope.codeData.isValid).toBe(null);
    }); 
    
    
  }); 
  
  
  describe('App: resetForm directive: ', function() {

    beforeEach(module('app.templates')); 
    
 
   beforeEach(inject(function(_$injector_) {
      $httpBackend = _$injector_.get('$httpBackend');
      $scope = _$injector_.get('$rootScope').$new();
      $compile = _$injector_.get('$compile');
      resetService = _$injector_.get('resetService');
      $q = _$injector_.get('$q');
      $scope.codeData = {
        isValid : null
      };
      $httpBackend.when('GET', '/views/form.tpl.html').respond({});
      $element = angular.element('<div reset-form data-code-data="codeData"></div>');
      template = $compile($element)($scope);
      $scope.$apply();
      $httpBackend.expectGET('/views/form.tpl.html');
    }));
    

    
    it('should have correct isolated scope', function () {
      isolateScope = $element.isolateScope();
      expect(isolateScope.codeData).toBeDefined();
    });
    
    it('should have submitForm function that calls resetService.password()', function () {
        isolateScope = $element.isolateScope();
        expect(isolateScope.submitForm).toBeDefined();
        spyOn(resetService, 'password').and.callThrough();
        isolateScope.submitForm();
        expect(resetService.password).toHaveBeenCalled();
    });
    
    it('should show error message when server returns invalid code', function () {   
        var errorElem = angular.element($element[0].querySelector('p.error')),
            inputElem = $element.find('input').eq(0),
            formCtrl = inputElem.controller('form');
        expect(errorElem.hasClass('ng-hide')).toEqual(true);
        isolateScope = $element.isolateScope();
        isolateScope.codeData.isValid = false;
        formCtrl.$submitted = true;
        isolateScope.code = '333333';
        isolateScope.$apply();
        expect(errorElem.hasClass('ng-hide')).toEqual(false);
    });
        
    it('should hide error message when code is invalid', function () {   
        var errorElem = angular.element($element[0].querySelector('p.error')),
            inputElem = $element.find('input').eq(0),
            formCtrl = inputElem.controller('form');
        isolateScope = $element.isolateScope();
        isolateScope.codeData.isValid = false;
        formCtrl.$submitted = true;
        isolateScope.code = '333333';
        isolateScope.$apply();
        expect(errorElem.hasClass('ng-hide')).toEqual(false);
        isolateScope = $element.isolateScope();
        isolateScope.codeData.isValid = false;
        formCtrl.$submitted = true;
        isolateScope.code = 'hello';
        isolateScope.$apply();
        expect(errorElem.hasClass('ng-hide')).toEqual(true);
    });    
    
    
    it('should hide warn message when input is valid', function () {   
        var warnElem = angular.element($element[0].querySelector('p.warn')),
            inputElem = $element.find('input').eq(0),
            formCtrl = inputElem.controller('form');
        
        isolateScope = $element.isolateScope();
        inputElem.val('33');
        isolateScope.code = '33';
        isolateScope.$apply();
        expect(warnElem.hasClass('ng-hide')).toEqual(false);
        
        inputElem.val('333333');
        isolateScope.code = '333333';
        isolateScope.$apply();
        expect(warnElem.hasClass('ng-hide')).toEqual(true);
    });
    
    
    it('should show success message when server returns valid code', function () {   
        var successElem = angular.element($element[0].querySelector('div.success')),
            inputElem = $element.find('input').eq(0),
            formCtrl = inputElem.controller('form');
        expect(successElem.hasClass('active')).toEqual(false);
        isolateScope = $element.isolateScope();
        isolateScope.codeData.isValid = true;
        formCtrl.$submitted = true;
        isolateScope.$apply();
        expect(successElem.hasClass('active')).toEqual(true);
    });

  }); 

  
});