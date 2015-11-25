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
      .client({type: 'redis-queue', pin: 'role:db,cmd:*'})
    setTimeout(done, 2 * 1000)
  })

  test('test save service', function (done) {
    seneca.act('role:db,cmd:save,zed:10', function (err, data) {

      Assert(!err)
      Assert(data)
      Assert(data.result)
      Assert(data.result.ok)
      done()
    })
  })
})

