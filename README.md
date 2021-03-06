# fetch-patch

[![Build Status](https://travis-ci.org/evanlucas/fetch-patch.svg)](https://travis-ci.org/evanlucas/fetch-patch)
[![Coverage Status](https://coveralls.io/repos/evanlucas/fetch-patch/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/fetch-patch?branch=master)

fetch a patch from github (works for private repos too)

Useful for piping into `git am`

**NOTE: requires `io.js` v1.x+ or node v4**

## Install

```bash
$ npm install -g fetch-patch
```

## Usage

```
$ fetch-patch help

fetch-patch

  fetch a patch from github (works for private repos too)

  usage:
    fetch-patch <patch url>
    fetch-patch <repo owner> <repo name> <pr #>

  note:
    in order for private repositories to work correctly, one must create a
    github token and place it in ~/.github_token
```

## Example

```bash
$ fetch-patch https://github.com/iojs/io.js/pull/1457.patch | git am

# or
$ fetch-patch iojs io.js 1457 | git am
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
