# usage:
# $ export NODE_PATH=/usr/local/lib/node_modules 
# $ mocha --compilers coffee:coffee-script

assert = require 'assert'
expect = require 'expect.js'

{getWindDirection} = require 'https://raw.github.com/stsysr/stsysr.github.io/master/javascripts/get_weather.js'

describe 'getWindDirection' ->
  expect(getWindDirection '175').to.eql '175'
