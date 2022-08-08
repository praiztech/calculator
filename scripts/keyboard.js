import handleShtcutKeyPress from "./shtcut.js";

export default function handleKeyboardPress(evt) {
  if (document.querySelector('.shtcut-dialog').hasAttribute('data-open')) {
    evt.type === 'keydown' ? handleDialogKeydown(evt) : null;
  } else if (document.querySelector('.keypad').contains(evt.target) && 
            (evt.key === ' ' || evt.key === 'Enter')) {
    simulateKeypadBtnClick(evt);
  } else {
    handleShtcutKeyPress(evt);
  }
}

function handleDialogKeydown(evt) {
  if (evt.repeat) return; //prevents multiple keydown handling on a long-key-press
  
  const clozDialogBtn = document.querySelector('.shtcut-dialog button');
  switch (evt.key) {
    case 'Escape':
      clozDialogBtn.click();
      break;
    case 'Tab':
      evt.preventDefault();
      clozDialogBtn.focus();
      break;
  }
}

//simulates button click movement for keyboard users with no preference for reduced motion
function simulateKeypadBtnClick(evt) { 
  switch (evt.type) {
    case 'keydown':
      if (evt.repeat) return;
      evt.target.setAttribute('data-active', 'true');
      break;
    case 'keyup':
      evt.target.removeAttribute('data-active');
      break;
  }
}
