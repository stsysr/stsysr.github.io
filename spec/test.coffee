assert = require 'assert'
expect = require 'expect.js'
$ = require 'jQuery'
jsdom = require 'jsdom'

# {getWindDirection} = require './../get_weather.js'

describe 'getWindDirection', ->

  before ->
    getWindDirection = (deg) ->
      deg

  it 'should return North', ->
    expect(getWindDirection '10').to.eql 'N'

  it 'should return East', ->
    expect(getWindDirection '45').to.eql 'E'

  it 'should return South', ->
    expect(getWindDirection '90').to.eql 'S'

  it 'should return West', ->
    expect(getWindDirection '270').to.eql 'W'
