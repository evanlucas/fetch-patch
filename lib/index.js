const request = require('request')
    , url = require('url')

exports.fetchPatchWithOpts = function fetchPatchWithOpts(opts, cb) {
  var href = `/repos/${opts.owner}/${opts.repo}/pulls/${opts.pr}.patch`
  var u
  if (opts.token) {
    u = `https://api.github.com${href}?access_token=${opts.token}`
  } else {
    u = `https://api.github.com${href}`
  }
  exports.fetchPatch(u, cb)
}

exports.fetchPatch = function fetchPatch(u, cb) {
  u = formatURL(u)
  request.get({
    uri: u
  , headers: {
      Accept: 'application/vnd.github.3.patch'
    , 'User-Agent': `fetch-patch v${require('../package').version}`
    }
  }, function(err, res, body) {
    if (err) return cb(err)
    if (res.statusCode >= 400) {
      return cb(new Error(body))
    }
    cb(null, body)
  })
}

function formatURL(u) {
  var parsed = url.parse(u)
  parsed.pathname = parsed.pathname.replace('/pull/', '/pulls/')
  var splits = parsed.pathname.split('/')
  splits.shift()
  splits.unshift('repos')
  parsed.pathname = splits.join('/')
  parsed.host = 'api.github.com'
  return url.format(parsed)
}
