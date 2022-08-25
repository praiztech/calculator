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
  let keyValue;
  switch (key) {
    case 'R':
    case 'r':
      if (altKeyPressed) keyValue = 'Reset';
      break;
    case 'D':
    case 'd':
      if (altKeyPressed) keyValue = 'Delete';
      break;
    default:
      if (ctrlKeyPressed) keyValue = key;
      break;
  }
  const btn4key = document.querySelector(`[data-key="${keyValue}"]`);
  btn4key.focus();
  btn4key.setAttribute('data-active', 'true');
}

function handleShtcutKeyup(target) { //target is the keypad btn focused by the keydown evt
  target.removeAttribute('data-active');
  target.click();
}
