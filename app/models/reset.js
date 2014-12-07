var getCode = function () {
    var d = new Date();
    return [('0' + d.getDate()).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear().toString().slice(-2)].join('');
  };

function Reset() {
  this.code = null;
  return this;
}

Reset.prototype.password = function (data, callback) {
  // code would, of course come from db or somewhere else
  this.code = getCode();
  var json = (data === this.code) ? {
      status : 1,
      msg : 'Congratulations! Your\e living in the present!' 
    } : {
      errorcode: 901,
      error: 'invalid code'
    };

    if (typeof callback === 'function') {
      callback(json);
    } else {
      throw new Error('Method requires a callback argument');
    }
};

module.exports = Reset;