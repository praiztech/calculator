import {displayInput, backSpace, displayResult, reSet} from "./input-funcs.js";

export default function processInput(evt) {
  if (!evt.target.matches('button')) return;

  let input = evt.target.dataset.key;
  switch (input) {
    case 'Delete':
      backSpace();
      break;
    case 'Clear':
      reSet();
      break;
    case '=':
      displayResult();
      break;
    default:
      displayInput(input);
      break;
  }
}
