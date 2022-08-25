const shtcutKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','=','d','D','r','R'];
let keyValue;

export default function handleShtcutKeyPress(evt) {
  if (!(shtcutKeys.includes(evt.key))) return; //listens for relevant keypress both from numpad and main keypad

  switch (evt.type) {
    case 'keydown':
      evt.preventDefault();
      keyValue = setKeyValue(evt.ctrlKey, evt.altKey, evt.key); //keyValue is undefined for wrong key combinations
      if (keyValue !== undefined) handleShtcutKeydown(keyValue);
      break;
    case 'keyup':
      if (keyValue !== undefined) handleShtcutKeyup(evt.target);
      break;
  }
}

function setKeyValue(ctrlKeyPressed, altKeyPressed, key) {
  switch (key) {
    case 'R':
    case 'r':
      if (altKeyPressed) return 'Reset';
      break;
    case 'D':
    case 'd':
      if (altKeyPressed) return 'Delete';
      break;
    default:
      if (ctrlKeyPressed) return key;
      break;
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
