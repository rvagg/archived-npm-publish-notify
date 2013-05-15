const NpmPublishStream = require('npm-publish-stream')
    , childProcess     = require('child_process')
    , path             = require('path')
    , FilterStream     = require('./filter-stream')

    , CMD_TMPL         =
        '{exe}'
      + ' --urgency normal'
      + ' --icon ' + path.join(__dirname, 'npm.png')
      + ' "{name}@{version}"'
      + ' "{description}'
      + '\\\\nby {maintainers}"'

function notify (exe, pkg) {
  var description = (pkg.doc.description || '').replace(/"/g, '\\"')
    , version     = pkg.doc['dist-tags'].latest
    , maintainers = pkg.doc.versions[pkg.doc['dist-tags'].latest].maintainers
        .map(function (m) { return '@' + m.name }).join(', ')
    , cmd = CMD_TMPL
        .replace(/\{exe\}/g, exe)
        .replace(/\{name\}/g, pkg.id)
        .replace(/\{version\}/g, version)
        .replace(/\{description\}/g, description)
        .replace(/\{maintainers\}/g, maintainers)

  childProcess.exec(cmd, function (err) {
    if (err)
      console.error(err)
  })
}

function start (notify, filterFn) {
  var nps = new NpmPublishStream()
  if (typeof filterFn == 'function')
    nps = nps.pipe(new FilterStream(filterFn))

  nps.on('data', notify)
  nps.on('error', console.error)
}

function npmPublishNotify (filterFn) {
  childProcess.exec('which notify-send', function (err, stdout) {
    if (err)
      throw err

    if (!stdout || stdout.toString().indexOf('/') == -1)
      throw new Error('Couldn\'t locate `notify-send` application')

    stdout = stdout.toString().replace(/[\n\s]/g, '')

    start(notify.bind(null, stdout), filterFn)
  })
}

module.exports = npmPublishNotify