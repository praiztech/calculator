const shtcutKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','=','Delete', 'Backspace'];
let keyValue;

export function handleShtcutKeyPress(evt) {
  if (!(shtcutKeys.includes(evt.key))) return; //listens for relevant keypress both from numpad and main keypad

  switch (evt.type) {
    case 'keydown':
      evt.preventDefault();
      keyValue = setKeyValue(evt.shiftKey, evt.key); //keyValue is undefined for wrong key combinations
      if (keyValue !== undefined) handleShtcutKeydown(keyValue);
      break;
    case 'keyup':
      if (keyValue !== undefined) handleShtcutKeyup(evt.target);
      break;
  }
}

function setKeyValue(shiftKeyPressed, key) {
  switch (key) {
    case 'Delete':
    case 'Backspace':
      return (shiftKeyPressed) ? 'Reset' : 'Delete';
    default:
      return key;
  }
}

function handleShtcutKeydown(keyValue) {
  const btn4key = document.querySelector(`[data-key="${keyValue}"]`);
  btn4key.focus();
  btn4key.setAttribute('data-active', 'true');
}

function handleShtcutKeyup(target) { //target is the keypad btn focused by the keydown evt
  target.removeAttribute('data-active');
  target.click();
}
