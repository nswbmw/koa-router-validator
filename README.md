## koa-router-validator

Validator middleware for [koa-router](https://github.com/alexmingoia/koa-router).

### Install

```
npm i koa-router-validator --save
```

### Example

```
'use strict';

var app = require('koa')();
var router = require('koa-router')();
var validator = require('koa-router-validator');
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

app.listen(3000);
```

see [test](./test.js).

### Test

```
npm test
```

### License

MIT