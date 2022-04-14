const chai = require("chai")
const assert = chai.assert
const expect = chai.expect
const sinon = require("sinon")

const math = {
    _add: function(a, b) {
        console.log("Add called ", a, b)
        return a + b
    },

    add : function(a, b) {
      return this._add(a, b)
      
    }
}

describe("Math Test Suite", () => {
    const sandbox = sinon.createSandbox();
    console.log("Inside Math Test suite")

    // called for every test case before it runs it
    // setup mock
    beforeEach( () => {
        console.log("before each test isnide math suite")
        sandbox.spy(math)
    })

    // clear the mock
    afterEach( () => {
        console.log("After each test case")
        sandbox.restore()
    })

    it("add function test", () => {
        console.log("inside add function test")
        const actualResult = math.add(10, 20)
        expect(actualResult).to.equal(30)

        assert(math._add.calledOnce, "_add must be called");
        expect(10).to.equal (math._add.getCall(0).args[0]);
        expect(20).to.equal (math._add.getCall(0).args[1]);
 

    })
})