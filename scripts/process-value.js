import setScreenValue from "./screen-value.js";

const operators = ['*', '/', '+', '-'];
const invalid1stOperand = ['+', '*', '/'];

export default function processValue(val, dataArr) {
  /*
    If the last data in dataArr was completely deleted, it must be filled by a value of the same data type i.e. operands replace deleted operands and operators replace deleted operators. Otherwise, the validity of an inputted value is dependent on the data types of the inputted value and last data in dataArr (if present).   
  */

  let dataCount = dataArr.length;
  let lastIndex = dataCount - 1;
  let lastData = dataArr[lastIndex]; //lastData can be a string of data, an object indicating that it was completely deleted or undefined when dataArr has only just been initialized i.e. empty

  let validValueType;

  if (lastData?.emptiedByUndo) {
    validValueType = (lastData.refillWith === 'operand') ? '1stOperand' : 'operator'; 
  } else if (dataCount === 0) { //dataArr has only just been initialized
    validValueType = '1stOperand';
  } else {
    switch (lastIndex % 2) { //operands are at even-numbered indexes while operators are at odd-numbered indexes
      case 0:
        validValueType = operators.includes(val) ? 'operator' : 'subsequentOperand';
        break;
      case 1: //only 1stOperand values are valid immediately after an operator
        validValueType = '1stOperand';
        break;
    }
  }
  return processedValue(validValueType, val, lastData);
}

function processedValue(valueType, val, lastData) {
  switch (valueType) {
    case 'operator':
      return processedOperatorValue(val, lastData);
    case '1stOperand':
      return processed1stOperandValue(val, lastData);
    case 'subsequentOperand':
      return processedSubsequentOperandValue(val, lastData);
  }
}

function processedOperatorValue(symbol, lastData) {
  if (!operators.includes(symbol) || //necessary for replacement scenario
      lastData === '-' //disallow an operator value immediately after an operator value
    ) return {response: 'invalid'};

  let altSymbol = setScreenValue(symbol); //symbols to compute and display are different for multiplication and division
  return ((lastData?.emptiedByUndo) ? 
          {response: 'substitute', dataValue: symbol, screenValue: altSymbol} : 
          {response: 'add', dataValue: symbol, screenValue: altSymbol});
}

function processed1stOperandValue(val, lastData) {
  if (invalid1stOperand.includes(val)) return {response: 'invalid'};

  if (val === '.') val = '0.';
  return (lastData?.emptiedByUndo) ? {response: 'substitute', dataValue: val} : {response: 'add', dataValue: val};
}

function processedSubsequentOperandValue(val, lastOperand) {
  if (lastOperand.length === 7 || //operands should have 7 characters max
      lastOperand.includes('.') && val === '.' //operands should have only one decimal point
    ) return {response: 'invalid'};
  
  let newLastOperand;
  if (lastOperand === '0' && Number.isInteger(+val)) {
    newLastOperand = val; //discard lastOperand '0'
  } else if (lastOperand === '-' && val === '.') {
    newLastOperand = '-0.';
  } else {
    newLastOperand = lastOperand + val;
  }
  return {response: 'substitute', dataValue: newLastOperand};
}
