const pgBody = document.body;
const pgContent = document.querySelector('.content');
const pgContentCtrls = pgContent.querySelectorAll('input, button');
const dialog = document.querySelector('.shtcut-dialog');

export default function openDialog() {
  dialog.setAttribute('data-open', 'true');
  dialog.querySelector('button').addEventListener('click', clozDialog);
  requestAnimationFrame(() => dialog.focus()); //requestAnimationFrame to ensure VoiceOver moves focus to dialog

  //used div instead of pseudo-element to allow event handler attachment
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.addEventListener('click', clozDialog);
  dialog.before(overlay);

  //for screen readers that dont support aria-modal
  pgContentCtrls.forEach((ctrl) => {
    ctrl.tabIndex = -1;
  });
  pgContent.setAttribute('aria-hidden', 'true');

  //ensures that only the dialog scrolls
  pgBody.setAttribute('data-prevent-scroll', 'true');
}

function clozDialog() {
  dialog.removeAttribute('data-open');
  dialog.previousElementSibling.remove(); //removes overlay
  pgContentCtrls.forEach((ctrl) => {
    ctrl.removeAttribute('tabindex');
  });
  pgContent.removeAttribute('aria-hidden');
  pgBody.removeAttribute('data-prevent-scroll');
  document.querySelector('button.open-dialog').focus();
}
