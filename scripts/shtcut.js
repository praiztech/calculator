const shtcutKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','=','d','D','r','R'];

export default function handleShtcutKeyPress(evt) {
  if (!(shtcutKeys.includes(evt.key))) return; //listens for relevant keypress both from numpad and main keypad

  switch (evt.type) {
    case 'keydown':
      evt.preventDefault();
      handleShtcutKeydown(evt.ctrlKey, evt.altKey, evt.key);
      break;
    case 'keyup':
      handleShtcutKeyup(evt.target);
      break;
  }
}

function handleShtcutKeydown(ctrlKeyPressed, altKeyPressed, key) {
  let keyValue = getKeyValue(ctrlKeyPressed, altKeyPressed, key);
  console.log(keyValue);
  if (keyValue === undefined) return; //wrong key combination
  
  const btn4key = document.querySelector(`[data-key="${keyValue}"]`);
  btn4key.focus();
  btn4key.setAttribute('data-active', 'true');
}

function getKeyValue(ctrlKeyPressed, altKeyPressed, key) {
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

function handleShtcutKeyup(target) { //target is the keypad btn focused by the keydown evt
  console.log(target);
  target.removeAttribute('data-active');
  target.click();
}
