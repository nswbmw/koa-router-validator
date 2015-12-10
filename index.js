'use strict';

var validatorIt = require('validator-it');
var merge = require('merge-descriptors');

module.exports = function (schemas) {
  var validatorFactory = validatorIt(schemas);
  return function* validator(next) {
    try {
      validatorFactory.call(this, this, true);
    } catch (e) {
      this.throw(e.status || e.statusCode || 400, e.message);
    }
    yield next;
  };
};

merge(module.exports, validatorIt);