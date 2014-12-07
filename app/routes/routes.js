module.exports = function (app) {

  /* API */
  app.post('/api/reset', require('../controllers/apiResetController'));

  /* APP */
  app.get('/*', require('../controllers/homeController'));

};