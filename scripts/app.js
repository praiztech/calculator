import PreviewData from "./preview-data.js";
import definePointerHighlighting from "./highlight.js";
import handleKeyboardPress from "./keyboard.js";
import openDialog from "./dialog.js";
import processInput from "./process-input.js";


customElements.define('preview-data', PreviewData);
definePointerHighlighting();

document.addEventListener('keydown', handleKeyboardPress);
document.addEventListener('keyup', handleKeyboardPress);

document.querySelector('button.open-dialog').addEventListener('click', openDialog);
document.querySelector('.keypad').addEventListener('click', processInput);
