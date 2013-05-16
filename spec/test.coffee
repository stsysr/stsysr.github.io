assert = require 'assert'
expect = require 'expect.js'
$ = require 'jQuery'
jsdom = require 'jsdom'

{getWindDirection} = require './../get_weather.js'

describe 'getWindDirection', ->

  it 'getWindDirection is defined', ->
    expect(getWindDirection '180').to.eql '180'

  it 'should return North', ->
    expect(getWindDirection '10').to.eql 'North'

  it 'should return East', ->
    expect(getWindDirection '45').to.eql 'East'

  it 'should return South', ->
    expect(getWindDirection '90').to.eql 'South'

  it 'should return West', ->
    expect(getWindDirection '270').to.eql 'West'
