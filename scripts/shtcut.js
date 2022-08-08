const shtcutKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','=','Backspace','Delete','R', 'r','C','c','Clear'];

export default function handleShtcutKeyPress(evt) {
  if (!(evt.altKey && shtcutKeys.includes(evt.key))) return;

  switch (evt.type) {
    case 'keydown':
      evt.preventDefault();
      handleShtcutKeydown(evt.key);
      break;
    case 'keyup':
      handleShtcutKeyup(evt.target);
      break;
  }
}

function handleShtcutKeydown(key) {
  let keyValue;
  switch (key) {
    case 'R':
    case 'r':
    case 'C':
    case 'c':
      keyValue = 'Clear';
      break;
    case 'Backspace':
      keyValue = 'Delete';
      break;
    default:
      keyValue = key;
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
