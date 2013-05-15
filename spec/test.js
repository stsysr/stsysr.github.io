/*
  node
  require.js
  mocha
  expect
  
  $ npm install -g mocha
  $ npm install expect.js
*/

var assert = require("assert")
var expect = require('expect.js');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

// expect style
// see https://github.com/LearnBoost/expect.js#api
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      expect([1,2,3].indexOf(5)).to.eql(-1);
    })
  })
})

describe('getWindDirection', function(){
  describe('getWindDirection()', function(){
    it('is define?', function(){
      expect(getWindDirection('175')).to.eql('175');
    })
  })
})
