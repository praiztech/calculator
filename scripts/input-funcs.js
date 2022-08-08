import {initialize, setLastComputedResult, isValid4ResultComputation} from "./lastcomputedresult.js";
import {setPreviewData, clearPreviewData} from "./process-preview-data.js";
import {computeResult, resizeOutputFont} from "./result-funcs.js";
import processValue from "./process-value.js";
import undo from "./undo.js";

export {displayInput, backSpace, displayResult, reSet};

const hiddenOutput = document.querySelector('output > [data-visually-hidden]');
const visibleOutput = document.querySelector('output > [data-visible]');
let dataArray = null;

function displayInput(value) {
  if (dataArray === null) {
    let {initArr, screenValue} = initialize(value);
    dataArray = initArr;
    hiddenOutput.textContent = '';
    visibleOutput.textContent = screenValue;
  }
  let {response, dataValue, screenValue} = processValue(value, dataArray);
  if (response !== 'invalid') {
    setDataValue(response, dataValue);
    updateOutput('', screenValue ?? dataValue);
  }
}

function backSpace() {
  //dataValue is either a string of data or an object indicating that it has been completely deleted
  let {response, dataValue} = undo(dataArray);
  if (response !== 'invalid') {
    setDataValue(response, dataValue);
    let screenValue = (dataValue?.emptiedByUndo) ? '' : dataValue;
    updateOutput('', screenValue);
  }
}

function setDataValue(response, dataValue) {
  let lastIndex = dataArray.length - 1;
  switch (response) {
    case 'substitute':
      dataArray[lastIndex] = dataValue;
      break;
    case 'add':
      setPreviewData(dataArray); //make any data in the last 7 indexes of dataArr available for preview
      dataArray.push(dataValue);
      break;
  }
}

function displayResult() {
  if (isValid4ResultComputation(dataArray)) {
    let {atPreviewData, resultValue} = computeResult(dataArray);
    dataArray = null;
    clearPreviewData();
    updateOutput(atPreviewData, resultValue);
  }
}

function reSet() {
  if (hiddenOutput.textContent !== 'No Output') {
    setLastComputedResult(null);
    dataArray = null;
    clearPreviewData();
    resizeOutputFont(3); //set output font to default size
    updateOutput('No Output', '');
  }
}

function updateOutput(hiddenOutputContent, visibleOutputContent) {
  hiddenOutput.textContent = hiddenOutputContent;
  visibleOutput.textContent = visibleOutputContent;
}

