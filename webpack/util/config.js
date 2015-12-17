/* eslint no-var: 0 */
'use strict'

var path = require('path')
var _ = require('lodash')

function getConfig () {
  var ROOT = process.cwd()
  var pkg = require(path.join(ROOT, 'package.json'))
  var config = {
    buildPath: '__build__',
    library: {
      name: pkg.name,
      main: pkg.main
    },
    app: {
      title: 'Instructure UI Component Library'
    },
    docs: {
      files: 'docs/**/*.md'
    },
    components: {
      files: 'lib/components/**/*.js',
      excludes: [
        /\.test\.js$/,
        /index\.js$/
      ]
    },
    tests: {
      files: 'lib/**/*.test.js'
    }
  }

  return _.merge({}, config, {
    rootPath: ROOT,
    docsAppPath: path.resolve(__dirname, '../../docs/app'),
    distPath: path.join(ROOT, config.buildPath, '/dist'),
    docsPath: path.join(ROOT, config.buildPath, '/docs')
  })
}

module.exports = getConfig()