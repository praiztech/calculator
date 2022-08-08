import PreviewData from "./preview-data.js";
import definePointerHighlighting from "./highlight.js";
import handleKeyboardPress from "./keyboard.js";
import openDialog from "./dialog.js";
import processInput from "./process-input.js";
import {setDefaultTheme, changeTheme} from "./theme.js";


customElements.define('preview-data', PreviewData);

setDefaultTheme();
definePointerHighlighting();

document.addEventListener('keydown', handleKeyboardPress);
document.addEventListener('keyup', handleKeyboardPress);

document.querySelector('.theme-widget').addEventListener('change', changeTheme);
document.querySelector('button.open-dialog').addEventListener('click', openDialog);
document.querySelector('.keypad').addEventListener('click', processInput);
