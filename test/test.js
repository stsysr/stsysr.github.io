var assert = buster.assertions.assert;
buster.testCase("Src Test", {
    "should be HELLO" : function(){
        assert.equals(hello(), "HELLO");
    }
})
