#!/usr/bin/env node

var filterFn
  , path = process.argv[2]

if (path) {
  if (!/^[\/\.]/.test(path))
    path = './' + path

  filterFn = require(path)
}

require('./')(filterFn)