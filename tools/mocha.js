var jsdom = require('jsdom')
var chai = require('chai')

require("babel/register")({
  stage: 0
});

function noop() {
  return null
}

require.extensions['.css']= noop
require.extensions['.less']= noop
require.extensions['.sass']= noop
require.extensions['.scss']= noop
require.extensions['.svg']= noop
require.extensions['.png']= noop


var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
var win = doc.defaultView

global.document = doc
global.window = win

Object.keys(window).forEach(function(key) {
  if (!(key in global)) {
    global[key] = window[key]
  }
})
