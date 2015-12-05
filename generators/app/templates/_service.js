'use strict';

var seneca = require('seneca')();

seneca
  .use('redis-queue-transport')
  .use('env-plugins')

seneca.add({role: '<%= name %>', cmd: 'action1'}, function(args, callback) {
  callback(null, {data: 'data'});
});

seneca.add({role: '<%= name %>', cmd: 'action2'}, function(args, callback) {
  callback(null, {data: 'data'});
});


seneca.listen({type: 'redis-queue', pin: 'role:db,cmd:*'})
module.exports = seneca;