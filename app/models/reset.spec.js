// testing Reset Model Class! 

var Reset = require('./reset'),
    ResetModelInstance,
    cb,
    resData,
    resetErrorObject = {
      errorcode: 901,
      error: 'invalid code'
    };


describe('reset model: ', function() {
  
  
  beforeEach(function() {
    resetModelInstance = new Reset();
  });
  
  
  
  it('should define a password function', function() {
    expect(typeof resetModelInstance.password).toEqual('function');
  });
  
  
  
  it('should run callback function and pass data', function() {
    cb = {
      setVar : function(data){
        resData = data;
      }
    };
    
    // make sure we set our value
    spyOn(cb, 'setVar').andCallThrough();
    resetModelInstance.password('', cb.setVar);
    
    // is called and passed object
    expect(cb.setVar).toHaveBeenCalled();
    expect(cb.setVar).toHaveBeenCalledWith(resetErrorObject);
    expect(resData).toEqual(resetErrorObject);
  });


});
