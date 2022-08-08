import setScreenValue from "./screen-value.js";

export {setPreviewData, clearPreviewData};

const previewData = document.querySelector('preview-data');

function setPreviewData(dataArr) {
  let dataCount = dataArr.length;
  if (dataCount === 0) return; //dataArr has only just been initialized

  let counter = (dataCount <= 7) ? dataCount : 7; //only 7 columns to fill
  for (let i = 1; i <= counter; i++) {
    previewData.dataset[`col${i}`] = setScreenValue(dataArr[dataCount-i]);
  }
}

function clearPreviewData() {
  let previewDataValues = previewData.dataset;
  for (let value in previewDataValues) {
    delete previewDataValues[value];
  }
}
