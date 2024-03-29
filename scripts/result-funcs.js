import {setLastComputedResult} from "./lastcomputedresult.js";
import setScreenValue from "./screen-value.js";

export {computeResult, resizeOutputFont};

function resizeOutputFont(multiplier) {
  //getComputedStyle ensures that initial declaration in stylesheet can also be retrieved
  let newFontSize = multiplier * getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').trim().replace('rem', '');
  document.querySelector('output > [data-visible]').style.setProperty('--output-font-size', `${newFontSize}rem`);
}

function computeResult(dataArr) {
  const errormsg1 = 'Exceeded Computation limits';
  const errormsg2 = 'Cannot Divide by 0';
  const maxResultLength = 14;
  const outputFontBreakpoint = 9;

  let result = computebyOperatorPrecedence(dataArr, errormsg1, errormsg2);
  let resultStr;
  switch (result) {
    case errormsg1:
    case errormsg2:
      resultStr = 'ERROR!';
      break;
    default:
      resultStr = result.toString();
      break;
  }
  let dataStr, result2Display;
  if (resultStr === 'ERROR!') {
    dataStr = '';
    result2Display = result;
    resizeOutputFont(1.3); //reduce output font size to accommodate error message
    setLastComputedResult(resultStr);
  } else {
    dataStr = dataArr.map(setScreenValue).join(' ');
    result2Display = (resultStr.length <= maxResultLength) ? 
                      `=${resultStr}` : 
                      `=${approxResult(resultStr, maxResultLength)}`;
    if (result2Display.length > outputFontBreakpoint) resizeOutputFont(2); //reduce output font size to accommodate large result
    setLastComputedResult(result2Display.slice(1));
  }
  return {atPreviewData: dataStr, resultValue: result2Display};
}

function computebyOperatorPrecedence(dataArr, errormsg1, errormsg2) {
  if (dataArr.length > 1001) return errormsg1;
  
  let resultArr = [...dataArr]; //copied to avoid mutating dataArr outside its module scope
  const maxComputableValue = Number.MAX_SAFE_INTEGER;
  const minComputableValue = Number.MIN_SAFE_INTEGER;

  //start at 1 and end at resultArr.length-2 coz operators are at odd-numbered indexes
  for (let i = 1; i <= resultArr.length-2; i += 2) {
    if (resultArr[i] === '*' || resultArr[i] === '/') {
      let computed = compute(resultArr[i-1], resultArr[i], resultArr[i+1]);
      if (computed === 'ZERO DIVISOR') return errormsg2;
      if (computed < minComputableValue || computed > maxComputableValue) return errormsg1;
      resultArr.splice(i-1, 3, computed);
      i -= 2; //move index 2 places back to account for deleted data
    }
  }
  let result;
  if (resultArr.length === 1) {
    [result] = resultArr;
  } else {
    let lastResult;
    for (let i = 1; i <= resultArr.length-2; i += 2) {
      let computed = (i === 1 ?
                      compute(resultArr[i-1], resultArr[i], resultArr[i+1]) :
                      compute(lastResult, resultArr[i], resultArr[i+1]));
      if (computed < minComputableValue || computed > maxComputableValue) return errormsg1;
      lastResult = computed;
    }
    result = lastResult;
  }
  return result;
}

function compute(operand1, operator, operand2) {
  let op1 = operand1.toString(), op2 = operand2.toString(); //ensures that subresults are converted to strings
  if ((!op1.includes('e') && op1.includes('.')) || (!op2.includes('e') && op2.includes('.'))
  ) return computedFloat(op1, operator, op2)
  return computedIntOrExp(op1, operator, op2);
}

//processes floats as integers to avoid extra decimal places
function computedFloat(op1, operator, op2) {
  let op1DecimalLength = op1.includes('.') ? op1.split('.')[1].length : 0;
  let op2DecimalLength = op2.includes('.') ? op2.split('.')[1].length : 0;
  let correctionFactor = ((operator === '*') ?
                          Math.pow(10, op1DecimalLength + op2DecimalLength) :
                          Math.pow(10, Math.max(op1DecimalLength, op2DecimalLength)));
  switch (operator) {
    case '*':
      return ((op1 * Math.pow(10, op1DecimalLength)) * (op2 * Math.pow(10, op2DecimalLength))) / correctionFactor;
    case '/':
      if (+op2 === 0 || +op2 === -0) return 'ZERO DIVISOR';
      return (op1 * correctionFactor) / (op2 * correctionFactor);
    case '+':
      return ((op1 * correctionFactor) + (op2 * correctionFactor)) / correctionFactor;
    case '-':
      return ((op1 * correctionFactor) - (op2 * correctionFactor)) / correctionFactor;
  }
}

function computedIntOrExp(op1, operator, op2) {
  switch (operator) {
    case '*':
      return +op1 * +op2;
    case '/':
      return (+op2 === 0 || +op2 === -0) ? 'ZERO DIVISOR' : +op1 / +op2;
    case '+':
      return +op1 + +op2;
    case '-':
      return +op1 - +op2;
  }
}

function approxResult(resultStr, maxResultLength) {
  let resultAsExp = resultStr.includes('e') ? resultStr : Number(resultStr).toExponential();
  
  //if result in exponential notation is more than the maximum allowed length, round its decimal component
  if (resultAsExp.length > maxResultLength) {
    let fixedCharsLength = resultAsExp.replace(/^(-)?\d(\.)\d+(e[+-]?\d{1,2})$/i, '$1$2$3').length;
    resultAsExp = Number(resultAsExp).toPrecision(maxResultLength - fixedCharsLength); 
  }
  return resultAsExp;
}
