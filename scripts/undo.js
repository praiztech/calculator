export default function undo(dataArr) {
  let lastIndex, lastData;
  if (dataArr !== null) {
    lastIndex = dataArr.length - 1;
    lastData = dataArr[lastIndex]; //lastData can be a string of data or an object indicating that it has been completely deleted
  }
  return ((dataArr === null || lastData?.emptiedByUndo) ? //nothing to delete
          {response: 'invalid'} :
          ((lastData.length === 1) ? //data will be completely deleted
          {response: 'substitute', dataValue: setValue4EmptiedData(lastIndex)} :
          {response: 'substitute', dataValue: lastData.slice(0, -1)}));
}

//returns a value that ensures that data emptied by undo() is filled by one of the same type
function setValue4EmptiedData(lastIndex) {
  switch (lastIndex % 2) { //operands are at even-numbered indexes while operators are at odd-numbered indexes
    case 0:
      return {emptiedByUndo: true, refillWith: 'operand'};
    case 1:
      return {emptiedByUndo: true, refillWith: 'operator'}; 
  }
} 
