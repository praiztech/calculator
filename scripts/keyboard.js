import { handleShtcutKeyPress } from "./shtcut.js";

export function handleKeyboardPress(evt) {
  // if shtcut dialog is open, ignore other keyboard event handlers
  if (document.querySelector('.shtcut-dialog').hasAttribute('data-open')) {
    evt.type === 'keydown' ? handleDialogKeydown(evt) : null; 
  } else {
    const keypad = document.querySelector('.keypad');
    if (keypad.contains(evt.target) && (evt.key === ' ' || evt.key === 'Enter')) {
      simulateKeypadBtnClick(evt);
    } else if (keypad.getAttribute('role') === 'application') {
      handleShtcutKeyPress(evt);
    }
  }
}

function handleDialogKeydown(evt) {
  if (evt.repeat) return; //prevents multiple keydown handling on a long-key-press
  
  const clozDialogBtn = document.querySelector('.shtcut-dialog button');
  const activateDialogCheckbox = document.querySelector('.shtcut-dialog input[type="checkbox"]');
  switch (evt.key) {
    case 'Escape':
      clozDialogBtn.click();
      break;
    case 'Tab':
      evt.preventDefault();
      document.activeElement === activateDialogCheckbox ? clozDialogBtn.focus() : activateDialogCheckbox.focus();
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
