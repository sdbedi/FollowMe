const deepFreeze = require('deep-freeze')
import { exportPulseData } from './client/src/store.jsx'
var pulseData = exportPulseData; //this will need to be changed if the exports in store.jsx are changed

var assert = require('assert');
describe('Reducers', function() {
  describe('pulseData', function() {
    // it('should preserve the original state', function() { //run the function, then check whether the imput is mutated
    //   //should be handled by deepFreeze
    // });
    describe('UNDEFINED STATE', function() {
      it('sets a default state if none is provided', function() {
        assert.deepEqual([0, 1], pulseData(undefined, {type: 'INCREMENT'}))      
      });
    });

    describe('INCREMENT', function() {
      beforeEach(function(){
      var testState = [1,2,3,4,5], testStateLength = testState.length
      deepFreeze(testState); // don't allow testState to be overwritten
    });
      
      it('creates a last value one greater than the second to last value', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(6, pulseData(testState, {type: 'INCREMENT'})[testStateLength])
      });

      it('adds one value to the new array', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(pulseData(testState, {type: 'INCREMENT'}).length, testStateLength+1);
      });

    });

    describe('DECREMENT', function() {
      it('creates a last value one less than the second to last value', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(4, pulseData(testState, {type: 'DECREMENT'})[testStateLength])      
      });

      it('adds one value to the new array', function() {
        var testState = [1,2,3,4,5], testStateLength = testState.length
        let lengthBefore = testState.length;
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.equal(pulseData(testState, {type: 'DECREMENT'}).length, lengthBefore+1);
      });

      it('pushes 0 when decrementing from 0', function() {
        var testState = [1, 0];
        var pulseTest = pulseData(testState, {type: 'DECREMENT'});
        var expectedAnswer = [1, 0, 0]
        deepFreeze(testState); // don't allow testState to be overwritten
        assert.deepEqual(expectedAnswer, pulseTest );
      });
    });

  });
});