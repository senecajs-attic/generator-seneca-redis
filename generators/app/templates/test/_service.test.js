'use strict'

var Assert = require('chai').assert
var Lab = require('lab')
var lab = exports.lab = Lab.script()
var suite = lab.suite
var before = lab.before
var test = lab.test

var seneca = require('seneca')({log: 'print'})

suite('basic test', function () {
  before({}, function (done) {

    require('./../service.js')

    seneca
      .use('redis-queue-transport')
      .client({type: 'redis-queue', pin: 'role:a,cmd:*'})
      .client({type: 'redis-queue', pin: 'role:b,cmd:*'})
    done()
  })

  test('test service', function (done) {
    seneca.act('role:a,cmd:foo,zed:10', function (err, data) {
      Assert(!err)
      Assert(data)
      Assert.equal(11, data.bar)
      done()
    })
  })
})

