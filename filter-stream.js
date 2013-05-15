const TransformStream = require('readable-stream').Transform
    , inherits        = require('util').inherits

function FilterStream (filterFn) {
  TransformStream.call(this, { objectMode: true })
  this.filterFn = filterFn
}

inherits(FilterStream, TransformStream)

FilterStream.prototype._transform = function (chunk, encoding, callback) {
  try {
    if (this.filterFn(chunk.doc))
      this.push(chunk)
  } catch (e) {
    console.error('Filter error:', e)
  }
  callback()
}

module.exports = FilterStream