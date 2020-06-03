'use strict';

let operations = {
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
let calledOperandShiftEight = false; //operandShift: func to populate last operand input field

function clearAll() {
  document.getElementById("A9").textContent = '';
  document.getElementById("A8").textContent = '';
  document.getElementById("A7").textContent = '';
  document.getElementById("A6").textContent = '';
  document.getElementById("A5").textContent = '';
  document.getElementById("A4").textContent = '';
  document.getElementById("A3").textContent = '';
  document.getElementById("A2").textContent = '';
  document.getElementById("A1").textContent = '';
  document.getElementById("result").textContent = '';
}

function backSpace() {

  let idArr = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];

  if (input) {
    let computedLen, countt, indexx;
    
    if (input[input.length - 1] in operations) {
      clearAll();

      input = input.slice(0, input.length - 1);
      let inputArr = createInputArr();
      computedLen = inputArr.length;
      countt = 0;
      for (let i = computedLen - 1; i >= 0; i--) {
        if (inputArr[i] in operations && countt <= 8) {
          indexx = i;
          document.getElementById(idArr[countt]).textContent = inputArr[i + 1];
          countt++;
          document.getElementById(idArr[countt]).textContent = inputArr[i];
          countt++;
        }
      }
      if ((computedLen <= 9) && (computedLen % 2 === 1)) {
        document.getElementById(idArr[countt]).textContent = inputArr[indexx - 1] || inputArr[0];
      }
    } else {
      let inputArr = createInputArr();
      computedLen = inputArr.length;
      let clrIndex = inputArr.length - 1;
      let clrIndexLen = inputArr[clrIndex].length;
      if (clrIndexLen > 1) {
        input = input.slice(0, input.length - 1);
        inputArr[clrIndex] = inputArr[clrIndex].slice(0, clrIndexLen - 1);
        document.getElementById("A1").textContent = inputArr[clrIndex];
      } else {
        input = input.slice(0, input.length - 1);
        clearAll();
        
        if (input) {
          document.getElementById("A1").textContent = inputArr[clrIndex - 1]; // start from penultimate value
          countt = 1; //start from A2
          for (let k = clrIndex - 2; k >= 0; k--) {
            if (inputArr[k] in operations && countt <= 8) {
              indexx = k;
              document.getElementById(idArr[countt]).textContent = inputArr[k + 1];
              countt++;
              document.getElementById(idArr[countt]).textContent = inputArr[k];
              countt++;
            }
          }
          if ((computedLen <= 9) && (computedLen % 2 === 1)) {
            document.getElementById(idArr[countt]).textContent = inputArr[indexx - 1] || inputArr[0];
          }
        }
      }
    }
  }  
}

function operatorShiftTwo(val) {
  document.getElementById("A2").textContent = document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A1").textContent = val;
}

function operatorShiftFour(val) {
  document.getElementById("A4").textContent = document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A3").textContent = document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, '');
  operatorShiftTwo(val);
}

function operatorShiftSix(val) {
  document.getElementById("A6").textContent = document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A5").textContent = document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, '');
  operatorShiftFour(val);
}

function operatorShiftEight(val) {
  document.getElementById("A8").textContent = document.getElementById("A7").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A7").textContent = document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, '');
  operatorShiftSix(val);
}

function showOperator(val) {
  if (document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '')) {
    if (!(document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, ''))) {
      operatorShiftTwo(val);
    } else {
      if (document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '')) {
        if (!(document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, ''))) {
          operatorShiftFour(val);
        } else {
          if (document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '')) {
            if (!(document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, ''))) {
              operatorShiftSix(val);
            } else {
              if (document.getElementById("A7").textContent.replace(/[\t\n\r ]+/g, '')) {
                if (!(document.getElementById("A8").textContent.replace(/[\t\n\r ]+/g, ''))) {
                  operatorShiftEight(val);
                } else {
                  if (document.getElementById("A9").textContent.replace(/[\t\n\r ]+/g, '')) {
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
    }
  } else {
    val = '';
  }
  return val;
}

function operandShiftTwo(val) {
  document.getElementById("A3").textContent = document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A2").textContent = document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A1").textContent = val;
}

function operandShiftFour(val) {
  document.getElementById("A5").textContent = document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A4").textContent = document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '');
  operandShiftTwo(val);
}

function operandShiftSix(val) {
  document.getElementById("A7").textContent = document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A6").textContent = document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '');
  operandShiftFour(val);
}

function operandShiftEight(val, calledOperandShiftEight) {
  calledOperandShiftEight = true;
  document.getElementById("A9").textContent = document.getElementById("A8").textContent.replace(/[\t\n\r ]+/g, '');
  document.getElementById("A8").textContent = document.getElementById("A7").textContent.replace(/[\t\n\r ]+/g, '');
  operandShiftSix(val);
  return calledOperandShiftEight;
}

function addOperandToA1(val) {
  if (val === '\u002e') {
    if ((document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '').indexOf('\u002e')) === -1) {
      document.getElementById("A1").textContent += val;
    } else {
      val = '';
    }
  } else {
    document.getElementById("A1").textContent += val;
  }
  return val;
}

function showOperand(val, calledOperandShiftEight) {
  if (!(document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, ''))) {
    document.getElementById("A1").textContent = val;
  } else {
    if (!(document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, ''))) {
      val = addOperandToA1(val);
    } else {
      if (!(document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, ''))) {
        operandShiftTwo(val);
      } else {
        if (!(document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, ''))) {
          val = addOperandToA1(val);
        } else {
          if (!(document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, ''))) {
            operandShiftFour(val);
          } else {
            if (!(document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, ''))) {
              val = addOperandToA1(val);
            } else {
              if (!(document.getElementById("A7").textContent.replace(/[\t\n\r ]+/g, ''))) {
                operandShiftSix(val);
              } else {
                if (!(document.getElementById("A8").textContent.replace(/[\t\n\r ]+/g, ''))) {
                  val = addOperandToA1(val);
                } else {
                  if (!calledOperandShiftEight) {
                    calledOperandShiftEight = operandShiftEight(val, calledOperandShiftEight);
                  } else {
                    val = addOperandToA1(val);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return [val, calledOperandShiftEight];
}

function shiftAll(val) {
  if (!(document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '') in operations)) {
    document.getElementById("A9").textContent = document.getElementById("A8").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A8").textContent = document.getElementById("A7").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A7").textContent = document.getElementById("A6").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A6").textContent = document.getElementById("A5").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A5").textContent = document.getElementById("A4").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A4").textContent = document.getElementById("A3").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A3").textContent = document.getElementById("A2").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A2").textContent = document.getElementById("A1").textContent.replace(/[\t\n\r ]+/g, '');
    document.getElementById("A1").textContent = val;
  } else {
    val = '';
  }
  return val;
}

function getAndShowValue(clickedId) {
  let nodeList = document.getElementById(clickedId).childNodes;
  let val = '';
  for (let i = 0; i < nodeList.length; i++) {
    val += nodeList[i].textContent;
  }
  val = val.replace(/[\t\n\r ]+/g, ''); //remove all whitespaces
  
  if (result !== '') {
    clearAll();
    if (val in operations) {
      document.getElementById("A1").textContent = result;
      input += result;
    }
    result = '';
  }
  
  if (val in operations) {
    val = showOperator(val);
    calledOperandShiftEight = false; //ensures that numbers that follow operators are displayed on a new field even when all fields are filled
  } else {
    let returnVal = showOperand(val, calledOperandShiftEight);
    val = returnVal[0];
    calledOperandShiftEight = returnVal[1];
  }
  input += val;
}

function createInputArr() {
  let inputArr = [];
  if (input) {
    let inputted; //needed to determine if there's a value after the last operator
    let index = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] in operations) {
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

function calculateAndShowResult() {
  
  let inputArr = createInputArr();

  if ((inputArr.length >= 3) && (inputArr.length % 2)) {
    for (let j = 0; j < inputArr.length; j++) {
      let computed;
      if (inputArr[j] === '\u00d7' || inputArr[j] === '\u00f7') {
        computed = operations[inputArr[j]](Number(inputArr[j - 1]), Number(inputArr[j + 1]));
        inputArr.splice(j - 1, 3, computed);
        j--;
      }
    }
    for (let k = 0; k < inputArr.length; k++) {
      let computed;
      if (inputArr[k] === '\u002b' || inputArr[k] === '\u2212') {
        computed = operations[inputArr[k]](Number(inputArr[k - 1]), Number(inputArr[k + 1]));
        inputArr.splice(k - 1, 3, computed);
        k--;
      }
    }
    if (inputArr.length === 1) {
      result = inputArr[0];
      document.getElementById("result").textContent = result;
      input = '';
    }
  }
}

function removeAlert() {
  const elem = document.querySelector('.alert');
  elem.style.display = 'none';
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}

function window_resize() {
  if (window.innerWidth <= 600 && window.innerWidth > window.innerHeight) {
    const element = document.querySelector('.alert');
    if (!element.firstElementChild) {
      const paragraph = document.createElement('p');
      const txt = document.createTextNode('Please use this app in portrait mode');
      paragraph.appendChild(txt);
      
      const close = document.createElement('span');
      close.className = 'closebtn';
      const closebtn = document.createTextNode('\u00d7');
      close.appendChild(closebtn);
      if (close.addEventListener) {
        close.addEventListener('click', removeAlert, false);
      } else if (close.attachEvent) {
        close.attachEvent('onclick', removeAlert);
      }
      
      element.appendChild(paragraph);
      element.insertBefore(close, paragraph);
      element.style.display = 'block';
      }
  }
}
