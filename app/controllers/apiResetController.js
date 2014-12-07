var Reset = require('../models/reset');

module.exports = function (req, res) {
  var reset = new Reset().password(req.body.code, function (data) {
    res.json(data);
  });
};