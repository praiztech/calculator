 const operations = {
  '\u002b': function(a, b) {
    return a + b;
  },
  '\u2212': function(a, b) {
    return a - b;
  },
  '\u00d7': function(a, b) {
    return a * b;
  },
  '\u00f7': function(a, b) {
    return a / b;
  }
};

let input = '';
let result = '';
let displayy;
let currOperand = '';
let calledOperandShiftSix = false; //operandShift: func to populate last operand input field
let currFontSize = 'big'; //stores the font size state of the input fields


//Polyfill to support Nodelist.forEach() in IE9+ and Edge
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

document.addEventListener('DOMContentLoaded', eventListenerr, false); //for IE9 support

function eventListenerr() {
  window.addEventListener('resize', showAlert, false);
  document.getElementById('delete').addEventListener('click', clearAllAndInput, false);
  document.getElementById('backspace').addEventListener('click', backSpace, false);
  document.querySelectorAll('.inputt').forEach(function(item) {
    item.addEventListener('click', getAndShowValue, false);
  });
  document.getElementById('equals').addEventListener('click', calculateAndShowResult, false);
}

function clearAll() {
  document.getElementById("A7").textContent = '';
  document.getElementById("A6").textContent = '';
  document.getElementById("A5").textContent = '';
  document.getElementById("A4").textContent = '';
  document.getElementById("A3").textContent = '';
  document.getElementById("A2").textContent = '';
  document.getElementById("A1").textContent = '';
  document.getElementById("outputt").textContent = '';
}

function clearAllAndInput() {
  clearAll();
  input = '';
  currOperand = '';
  result = '';
  if (currFontSize === 'small') {
    enlargeFontSize();
    currFontSize = 'big';
  }
}

function createInputArr() {
  let inputArr = [];
  if (input) {
    let inputted; //needed to determine if there's a value after the last operator
    let index = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] in operations && i !== index && input[i - 1] !== 'e') { 
        //2nd condition to address negative operands, 3rd condition to address exponential operands
        inputArr.push(input.slice(index, i));
        inputArr.push(input[i]);
        index = i + 1;
        inputted = input.slice(index);
      }
    }
    if (inputted !== '') {
      inputArr.push(input.slice(index)); //add the value after the last operator if there's one
    }
  }
  return inputArr
}

function backSpace() {

  let idArr = ["A1", "A2", "A3", "A4", "A5", "A6", "A7"];

  if (input) {
    let computedLen, countt;
    
    if (input[input.length - 1] in operations && currOperand === '') {
      
      clearAll();

      input = input.slice(0, input.length - 1);
      let inputArr = createInputArr();
      computedLen = inputArr.length;
      countt = 0;
      let indexx;
      for (let i = computedLen - 1; i >= 0; i--) {
        if (inputArr[i] in operations && countt < 6) {
          indexx = i;
          document.getElementById(idArr[countt]).textContent = inputArr[i + 1];
          countt++;
          document.getElementById(idArr[countt]).textContent = inputArr[i];
          countt++;
        }
      }
      if (computedLen <= 7) {
        document.getElementById(idArr[countt]).textContent = inputArr[0];
      } else {
        document.getElementById(idArr[countt]).textContent = inputArr[indexx - 1];
      }
      currOperand = inputArr[computedLen - 1];
      if (computedLen > 6) {
        calledOperandShiftSix = true; 
        // so that when values overflow the input fields and an operator is removed, numbers can be added to the operand at A1 provided the operand's length is less than 8 or 9
      } 
    } else {
      let inputArr = createInputArr();
      computedLen = inputArr.length; //note that here inputArr includes the value to be removed
      let clrIndex = inputArr.length - 1;
      let clrIndexLen = inputArr[clrIndex].length;
      if (clrIndexLen > 1) {
        input = input.slice(0, input.length - 1);
        inputArr[clrIndex] = inputArr[clrIndex].slice(0, clrIndexLen - 1);
        if (currFontSize === 'small') {
          let enlargeFont = true;
          for (let j = 0; j < computedLen; j++) {
            if (inputArr[j].length > 7) {
              enlargeFont = false;
              break;
            }
          }
          if (enlargeFont) {
            enlargeFontSize();
            currFontSize = 'big';
          }
        }
        document.getElementById("A1").textContent = inputArr[clrIndex];
        currOperand = inputArr[clrIndex];
        if (computedLen > 6) {
          calledOperandShiftSix = true; 
          //so that when values overflow the input fields, numbers can still be added to the same operand from which a value was removed, provided the operand's length is less than 8 or 9
        }
      } else {
        input = input.slice(0, input.length - 1);
        currOperand = '';
        calledOperandShiftSix = false;
        //so that when values overflow the input fields, numbers aren't added to the operator at A1 since calledOperandShiftSix would have previously been assigned the value true
        
        clearAll();
        
        if (input) {
          document.getElementById("A1").textContent = inputArr[clrIndex - 1]; // start after operand to be removed
          countt = 1; //start from A2
          for (let k = clrIndex - 2; k >= 0; k--) {
            if (inputArr[k] in operations && countt < 6) {
              document.getElementById(idArr[countt]).textContent = inputArr[k + 1];
              countt++;
              document.getElementById(idArr[countt]).textContent = inputArr[k];
              countt++;
            }
          }
          if (computedLen <= 7) {
            document.getElementById(idArr[countt]).textContent = inputArr[0];
          }
        }
      }
    }
  }  
}

function operatorShiftTwo(val) {
  let A1 = document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '');
  if ((A1.indexOf('-') !== -1 && A1.length >= 2) || (A1.indexOf('-') === -1 && A1.length >= 1)) {
    document.getElementById("A2").textContent = A1;
    document.getElementById("A1").textContent = val;
  } else {
    val = '';
  }
  return val;
}

function operatorShiftFour(val) {
  document.getElementById("A4").textContent = document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A3").textContent = document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, '');
  val = operatorShiftTwo(val);
  return val;
}

function operatorShiftSix(val) {
  document.getElementById("A6").textContent = document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A5").textContent = document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, '');
  val = operatorShiftFour(val);
  return val;
}

function shiftAll(val) {
  if (!(document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '') in operations)) {
    document.getElementById("A7").textContent = document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, '');
    val = operatorShiftSix(val);
  } else {
    val = ''; //so that subsequent shifting after input fields are filled, do not allow consecutive inputs of operators
  }
  return val;
}

function showOperator(val) {
  if (document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '')) {
    if (!(document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, ''))) {
      val = operatorShiftTwo(val);
    } else {
      if (document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '')) {
        if (!(document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, ''))) {
          val = operatorShiftFour(val);
        } else {
          if (document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '')) {
            if (!(document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, ''))) {
              val = operatorShiftSix(val);
            } else {
              if (document.getElementById("A7").textContent.replace(/[\t\n\r ]+/g, '')) {
                val = shiftAll(val);
              } else {
                val = '';
              }
            }
          } else {
            val = '';
          }
        }
      } else {
        val = '';
      } 
    }
  } else {
    val = '';
  }
  return val;
}

function operandShiftTwo(val) {
  document.getElementById("A3").textContent = document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A2").textContent = document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '');
}

function operandShiftFour(val) {
  document.getElementById("A5").textContent = document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A4").textContent = document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '');
  operandShiftTwo(val);
}

function operandShiftSix(val, calledOperandShiftSix) {
  calledOperandShiftSix = true;
  document.getElementById("A7").textContent = document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A6").textContent = document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '');
  operandShiftFour(val);
  return calledOperandShiftSix;
}

function populateEmptyA1(val) {
  if (val in operations) {
    if (val === '\u2212') {
      val = '-'; // coz Number() can't convert numbers with '\u2212'
      document.getElementById("A1").textContent = val;
    } else {
      val = ''; //discard other operators except the minus sign
    }
  } else {
    if (val === '\u002e') {
      val = '0' + val;
    }
    document.getElementById("A1").textContent = val;
  }
  return val;
}

function shift2AndFillA1(val) {
  if (val in operations) {
    if (val === '\u2212') {
      val = '-'; // coz Number() can't convert numbers with '\u2212'
      operandShiftTwo(val);
      document.getElementById("A1").textContent = val;
    } else {
      val = ''; //discard other operators except the minus sign
    }
  } else {
    if (val === '\u002e') {
      val = '0' + val;
    }
    operandShiftTwo(val);
    document.getElementById("A1").textContent = val;
  }
  return val;
}

function shift4AndFillA1(val) {
  if (val in operations) {
    if (val === '\u2212') {
      val = '-'; // coz Number() can't convert numbers with '\u2212'
      operandShiftFour(val);
      document.getElementById("A1").textContent = val;
    } else {
      val = ''; //discard other operators except the minus sign
    }
  } else {
    if (val === '\u002e') {
      val = '0' + val;
    }
    operandShiftFour(val);
    document.getElementById("A1").textContent = val;
  }
  return val;
}

function shift6AndFillA1(val) {
  if (val in operations) {
    if (val === '\u2212') {
      val = '-'; // coz Number() can't convert numbers with '\u2212'
      calledOperandShiftSix = operandShiftSix(val);
      document.getElementById("A1").textContent = val;
    } else {
      val = ''; //discard other operators except the minus sign
    }
  } else {
    if (val === '\u002e') {
      val = '0' + val;
    }
    calledOperandShiftSix = operandShiftSix(val);
    document.getElementById("A1").textContent = val;
  }
  return [val, calledOperandShiftSix];
}

function addOperandToA1(val) {
  if (!(val in operations)) {
    if (val === '\u002e') {
      if (currOperand.indexOf('\u002e') === -1) {
        if (currOperand === '-') {
          val = '0' + val;
        }
        document.getElementById("A1").textContent += val;
      } else {
        val = '';
      }
    } else {
      if (currOperand === '0') {
        if (val !== '0') {
          input = input.slice(0, input.length - 1);
          currOperand = ''; //val will be added subsequently by getAndShowValue()
          document.getElementById("A1").textContent = val;
        } else {
          val = '';
        }
      } else {
        document.getElementById("A1").textContent += val;
      }
    }
  } else {
    val = '';
  }
  return val;
}

function showOperand(val, calledOperandShiftSix) {
  if (!(document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, ''))) {
    val = populateEmptyA1(val);
  } else {
    if (!(document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, ''))) {
      val = addOperandToA1(val);
    } else {
      if (!(document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, ''))) {
        val = shift2AndFillA1(val);
      } else {
        if (!(document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, ''))) {
          val = addOperandToA1(val);
        } else {
          if (!(document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, ''))) {
            val = shift4AndFillA1(val);
          } else {
            if (!(document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, ''))) {
              val = addOperandToA1(val);
            } else {
              if (!calledOperandShiftSix) {
                let returnVal = shift6AndFillA1(val);
                val = returnVal[0];
                calledOperandShiftSix = returnVal[1];
              } else {
                val = addOperandToA1(val);
              }
            }
          }
        }
      }
    }
  }
  return [val, calledOperandShiftSix];
}

function reduceFontSize() {
  document.querySelectorAll('.input-display > div').forEach(function(item) {
    item.style.fontSize = '0.7em';
  });
}

function enlargeFontSize() {
  document.querySelectorAll('.input-display > div').forEach(function(item) {
    item.style.fontSize = '0.85em';
  });
}

function getAndShowValue() {
  if (window.outerWidth >= 360) { //coz operand range won't work for devices with a width of less than 360
    let nodeList = this.childNodes;
    let val = '';
    for (let i = 0; i < nodeList.length; i++) {
      val += nodeList[i].textContent;
    }
    val = val.replace(/[\t\n\r ]+/g, ''); //remove all whitespaces

    if (result !== '') {
      clearAll();
      if (result !== 'ERROR!') {
        if (val in operations) {
          if (result.toString().length > 7 && currFontSize === 'big') {
            reduceFontSize();
            currFontSize = 'small';
          } else if (result.toString().length <= 7 && currFontSize === 'small') {
            enlargeFontSize();
            currFontSize = 'big';
          }
          document.getElementById("A1").textContent = displayy;
          input += result;
        }
      }
      currOperand = result;
      result = '';
    }
    
    if (val in operations && currOperand !== '' && currOperand !== '-') {
      //2nd and 3rd conditions ensure that the preceding value isn't an operator
      if (currOperand[currOperand.length - 1] === '\u002e') {
        document.getElementById("A1").textContent = currOperand + '0'; 
        //adds 0 to preceding operand if it has no number after the decimal point
        input += '0';
      }
      currOperand = '';
      calledOperandShiftSix = false;
      //so that numbers inputted after an operator are displayed on the subsequent input field ie numbers are not added to an operator even when all fields are filled

      val = showOperator(val);
    } else {
      if ((currOperand[0] === '-' && currOperand.indexOf('\u002e') !== -1 && currOperand.length < 11)
      || (currOperand[0] === '-' && currOperand.length < 10)
      || (currOperand.indexOf('\u002e') !== -1 && currOperand.length < 10)
      || (currOperand.length < 9)) {
        if (currOperand.length === 7 && currFontSize === 'big') {
          //7 coz when a decimal point is added to an operand of length 7, its length grows to 9 not 8 if an operator is inputted subsequently ie 7 is applicable whether there's a decimal point or not 
          reduceFontSize();
          currFontSize = 'small';
        }
        let returnVal = showOperand(val, calledOperandShiftSix);
        val = returnVal[0];
        calledOperandShiftSix = returnVal[1];
        currOperand += val;
      } else {
        val = '';
      }
    }
    input += val;
  }
}

function calculateAndShowResult() {
  
  let inputArr = createInputArr();

  if ((inputArr.length >= 3) && (inputArr.length % 2)) {
    let computed;
    for (let j = 0; j < inputArr.length; j++) {
      if (inputArr[j] === '\u00d7' || inputArr[j] === '\u00f7') {
        computed = operations[inputArr[j]](+inputArr[j - 1], +inputArr[j + 1]);
        inputArr.splice(j - 1, 3, computed);
        j--;
      }
    }
    for (let k = 0; k < inputArr.length; k++) {
      if (inputArr[k] === '\u002b' || inputArr[k] === '\u2212') {
        computed = operations[inputArr[k]](+inputArr[k - 1], +inputArr[k + 1]);
        inputArr.splice(k - 1, 3, computed);
        k--;
      }
    }
    if (inputArr.length === 1) {
      result = inputArr[0];
      if (result.toString().length > 13) {
        displayy = result.toExponential();
        if (displayy.length > 10) {
          displayy = result.toExponential(7);
        }
      } else if (result === Infinity) {
        displayy = '∞';
      } else if (result === -Infinity) {
        displayy = '-∞';
      } else if (isNaN(result)) {
        displayy = 'ERROR!';
      } else {
        displayy = result;
      }
      document.getElementById("outputt").textContent = displayy;
      input = '';
      currOperand = '';
    }
  }
}

function showAlert() {
  if (window.outerWidth <= 600 && window.outerWidth > window.outerHeight) {
    if (!document.querySelector('div.alert')) {
      const element = document.createElement('div');
      element.className = 'alert';
      
      const paragraph = document.createElement('p');
      const txt = document.createTextNode('Please use this app in portrait mode');
      paragraph.appendChild(txt); //appendChild for IE compatibility
      
      const close = document.createElement('span');
      close.className = 'closebtn';
      const closebtn = document.createTextNode('\u00d7');
      close.appendChild(closebtn);
      close.addEventListener('click', removeAlert, false);
      
      element.appendChild(close);
      element.appendChild(paragraph);
      
      const h1 = document.querySelector('h1');
      h1.parentNode.insertBefore(element, h1); //insertBefore for IE compatibility
    }
  }
}

function removeAlert() {
  const elem = document.querySelector('div.alert');
  if (elem) { //prevents error due to user call after elem has been removed
    elem.parentNode.removeChild(elem); //removeChild for IE compatibility 
  }
}
