import PreviewData from "./preview-data.js";
import definePointerHighlighting from "./highlight.js";
import { handleKeyboardPress } from "./keyboard.js";
import { openDialog, clozDialog } from "./dialog.js";
import processInput from "./process-input.js";

(function setShortcutsDefault() {
  if (localStorage.getItem('shortcuts') === 'true') {
    document.getElementById('keyboard-shortcuts').setAttribute('data-active', 'true');
    document.querySelector('.keypad').setAttribute("role", "application");
    document.querySelector('.shtcut-dialog input[type="checkbox"]').checked = true;
  }
})();
customElements.define('preview-data', PreviewData);
definePointerHighlighting();

document.getElementById('keyboard-shortcuts').addEventListener('click', openDialog);
document.querySelector('.shtcut-dialog button').addEventListener('click', clozDialog);
document.querySelector('.shtcut-dialog input[type="checkbox"]').addEventListener('change', (evt) => {
  const shortcutsChecked = evt.target.checked;
  document.querySelector('.keypad').setAttribute("role", shortcutsChecked ? "application" : "group");
  try { //save user's choice
    localStorage.setItem('shortcuts', shortcutsChecked ? 'true' : 'false');
  } catch {}
});
document.querySelector('.keypad').addEventListener('click', processInput);
document.addEventListener('keydown', handleKeyboardPress);
document.addEventListener('keyup', handleKeyboardPress);
