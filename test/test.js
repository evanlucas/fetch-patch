'use strict'

const test = require('tap').test
    , fetch = require('../')

test('fetchPatchWithOpts', function(t) {
  t.plan(2)
  var orig = fetch.fetchPatch
  fetch.fetchPatch = function(u, cb) {
    cb(null, u)
  }

  // should work with token
  fetch.fetchPatchWithOpts({
    owner: 'nodejs'
  , repo: 'node'
  , pr: '3108'
  , token: '1234'
  }, function(err, u) {
    t.equal(u, 'https://api.github.com/repos/nodejs/node/pulls/3108.patch'+
      '?access_token=1234')
  })

  fetch.fetchPatchWithOpts({
    owner: 'nodejs'
  , repo: 'node'
  , pr: '3108'
  }, function(err, u) {
    fetch.fetchPatch = orig
    t.equal(u, 'https://api.github.com/repos/nodejs/node/pulls/3108.patch')
  })
})

test('fetchPatch should return err if request fails', function(t) {
  var request = require('request')
  var origGet = request.get
  request.get = function(opts, cb) {
    cb(new Error('ERROR'))
  }

  fetch.fetchPatch('1234', function(err, out) {
    request.get = origGet
    t.type(err, Error)
    t.equal(err.message, 'ERROR')
    t.end()
  })
})

test('fetchPatch should return err if status code >= 400', function(t) {
  var request = require('request')
  var origGet = request.get
  request.get = function(opts, cb) {
    cb(null, {
      statusCode: 401
    }, 'Forbidden')
  }

  fetch.fetchPatch('1234', function(err, out) {
    request.get = origGet
    t.type(err, Error)
    t.equal(err.message, 'Forbidden')
    t.end()
  })
})

test('fetchPatch should return the patch on success', function(t) {
  var request = require('request')
  var origGet = request.get
  request.get = function(opts, cb) {
    cb(null, {
      statusCode: 200
    }, 'This is a patch')
  }

  fetch.fetchPatch('1234', function(err, out) {
    request.get = origGet
    t.ifError(err)
    t.equal(out, 'This is a patch')
    t.end()
  })
})
