/*
  TESTS FOR BACKEND API... supertest (super-agent) with jasmine. yay.
*/

console.log('Running jasmine-node task:');

var express = require('express'),
    supertest = require('supertest'),
    server,
    today,
    d,
    // mocks
    resetSuccessObject = {
      status : 1,
      msg : 'Congratulations! Your\e living in the present!' 
    },
    resetErrorObject = {
      errorcode: 901,
      error: 'invalid code'
    };

// start server
app = require('./app.js')(express, 3000);
server = app.listen(app.get('port'));


/* TESTS */
describe('app: ', function() {
  'use strict';
  
  /* SERVER */
  // do we even have a web server running?
  describe('web: ', function() {
    it('should respond with 200', function(done) {
      supertest(app).get('/')
        .expect(200, done);
    });
  });
  
  /* API */
  
  describe('json api: ', function() {
    
    // fail cases for /api/reset
    it('should respond with error when passed empty string', function(done) {
      supertest(app).post('/api/reset')
        .send({ code: ''})
        .set('Accept', 'application/json')
        .expect(resetErrorObject, done);
    });
    
    it('should respond with error when passed wrong type', function(done) {
      supertest(app).post('/api/reset')
        .send({ code: 123456})
        .set('Accept', 'application/json')
        .expect(resetErrorObject, done);
    });
    
    it('should respond with error when passed wrong value', function(done) {
      supertest(app).post('/api/reset')
        .send({ code: '123456'})
        .set('Accept', 'application/json')
        .expect(resetErrorObject, done);
    });
    
    
    // success case
    it('should respond with success when passed right type', function(done) {
      d = new Date();
      today = [('0' + d.getDate()).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear().toString().slice(-2)].join('');
      supertest(app).post('/api/reset')
        .send({ code: today})
        .set('Accept', 'application/json')
        .expect(resetSuccessObject, done);
    });
     
  });
});

server.close();
