#!/usr/bin/env node

var path = require('path')
  , filterFn
  , file = process.argv[2]

if (file) {
  file = path.resolve(process.cwd(), file)
  filterFn = require(file)
}

require('./')(filterFn)