#!/usr/bin/env node

const args = process.argv.splice(2)
    , patch = require('../')
    , fs = require('fs')
    , home = process.env.HOME
    , path = require('path')

if (!args.length) return usage(1)

if (args[0] === 'help' || args[0] === '-h' || args[0] === '--help') {
  return usage(0)
}

const token = readToken()

if (args.length === 1) {
  var url
  if (token) {
    url = `${args[0]}?access_token=${token}`
  } else {
    url = args[0]
  }
  patch.fetchPatch(url, done)
} else if (args.length === 3) {
  var opts = {
    owner: args[0]
  , repo: args[1]
  , pr: args[2]
  , token: token
  }

  patch.fetchPatchWithOpts(opts, done)

} else {
  usage(1)
}

function done(err, out) {
  if (err) {
    console.error('ERR:', err)
    process.exit(1)
  }

  console.log(out)
}

function readToken() {
  var token
  try {
    return fs.readFileSync(path.join(home, '.github_token'), 'utf8').trim()
  }
  catch (err) {}
}

function usage(code) {
  var rs = fs.createReadStream(__dirname + '/usage.txt')
  rs.pipe(process.stdout)
  rs.on('close', function() {
    if (code) process.exit(code)
  })
}
