'use strict';

var request = require('supertest');
var assert = require('assert');

var app = require('koa')();
var router = require('koa-router')();
var validator = require('./');
var bodyparser = require('koa-bodyparser');

app.use(bodyparser());
app.use(router.routes());

router.post('/', validator({
  request: {
    body: {
      user: function checkUser(user) {
        if (!user) {
          throw new Error('No user'); // this.throw(400, new Error('No user'))
        }
      }
    }
  },
  'request.body.age': validator.isNumeric()
}), function *() {
  this.body = 'Hello, world';
});

describe('koa-router-validator', function () {
  it('should throw `No user`', function (done) {
    request(app.callback())
      .post('/')
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.text, 'No user');
        done();
      });
  });

  it('should throw `[request.body.age: undefined] ✖ isNumeric`', function (done) {
    request(app.callback())
      .post('/')
      .send({ user: 'nswbmw' })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.text, '[request.body.age: undefined] ✖ isNumeric');
        done();
      });
  });

  it('should return `Hello, world`', function (done) {
    request(app.callback())
      .post('/')
      .send({ user: 'nswbmw', age: '99' })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.text, 'Hello, world');
        done();
      });
  });
});