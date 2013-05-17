/*------------------------
  node
  require.js
  mocha
  expect
  
  $ npm install -g mocha
  $ npm install expect.js
-------------------------*/

var assert = require('assert');
var expect = require('expect.js');

describe('getWindDirection', function(){
  describe('getWindDirection()', function(){

    function getWindDirection (degree) {
      var number = Math.round((degree/360)*16);
      var direction = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N'];
      return direction[number];
    }

    it('should be defined?', function(){
      expect(getWindDirection).to.be.ok();
    })

    it('should return N', function(){
      expect(getWindDirection(349)).to.eql('N');
    })

    it('should return N', function(){
      expect(getWindDirection(11)).to.eql('N');
    })

    it('should return N', function(){
      expect(getWindDirection(12)).to.eql('NNE');
    })

    it('should return N', function(){
      expect(getWindDirection(34)).to.eql('NE');
    })

    it('should return N', function(){
      expect(getWindDirection(57)).to.eql('ENE');
    })

    it('should return N', function(){
      expect(getWindDirection(79)).to.eql('E');
    })

    it('should return N', function(){
      expect(getWindDirection(102)).to.eql('ESE');
    })

    it('should return N', function(){
      expect(getWindDirection(124)).to.eql('SE');
    })

    it('should return N', function(){
      expect(getWindDirection(147)).to.eql('SSE');
    })

    it('should return N', function(){
      expect(getWindDirection(169)).to.eql('S');
    })

    it('should return N', function(){
      expect(getWindDirection(192)).to.eql('SSW');
    })

    it('should return N', function(){
      expect(getWindDirection(214)).to.eql('SW');
    })

    it('should return N', function(){
      expect(getWindDirection(237)).to.eql('WSW');
    })

    it('should return N', function(){
      expect(getWindDirection(259)).to.eql('W');
    })

    it('should return N', function(){
      expect(getWindDirection(282)).to.eql('WNW');
    })

    it('should return N', function(){
      expect(getWindDirection(304)).to.eql('NW');
    })

    it('should return N', function(){
      expect(getWindDirection(327)).to.eql('NNW');
    })

  })
})

