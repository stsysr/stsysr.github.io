assert = require 'assert'
expect = require 'expect.js'
$ = require 'jQuery'
jsdom = require 'jsdom'

{getWindDirection} = require './../get_weather.js'

describe 'getWindDirection', ->

  it 'getWindDirection is defined', ->
	  expect(getWindDirection '180').to.eql '180'
