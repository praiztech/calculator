import {resizeOutputFont} from "./result-funcs.js";

export {initialize, setLastComputedResult, isValid4ResultComputation};

const operators = ['*', '/', '+', '-'];
let lastComputedResult = null;

function initialize(val) {
  const outputFontBreakpoint = 9;
  let initializationValue = {initArr: [], screenValue: ''};

  //result was just previously computed
  if (lastComputedResult !== null) { 
    //set output font to default size, if reduced
    if (lastComputedResult === 'ERROR!' || lastComputedResult.length > outputFontBreakpoint) resizeOutputFont(3);
    
    //when the input that triggers initialization is an operator, take the last computed result as the preceding operand if it isnt 'ERROR!'
    if (operators.includes(val) && lastComputedResult !== 'ERROR!') {
      initializationValue = {initArr: [lastComputedResult], screenValue: lastComputedResult};
    }
    setLastComputedResult(null);
  }
  return initializationValue;
}

//defined as a function to ensure that lastComputedResult is only modified in its module scope
function setLastComputedResult(value) {
  lastComputedResult = value;
}

function isValid4ResultComputation(dataArr) {
  let lastIndex;
  if (dataArr !== null) lastIndex = dataArr.length - 1;
  
  if (lastComputedResult !== null || //result has only just been computed
      dataArr === null || //nothing to compute
      dataArr.length < 3 ||
      dataArr[lastIndex]?.emptiedByUndo || //emptied data must be filled before result computation
      operators.includes(dataArr[lastIndex])
    ) return false;
  return true;
}
