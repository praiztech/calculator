export { openDialog, clozDialog };

const pgBody = document.body;
const pgContent = document.querySelector('.content');
const pgContentCtrls = pgContent.querySelectorAll('input, button');
const dialog = document.querySelector('.shtcut-dialog');
const dialogTrigger = document.getElementById('keyboard-shortcuts');

function openDialog() {
  // ensures trigger button is always in viewport while dialog is open
  if (!dialogTrigger.hasAttribute('data-active')) dialogTrigger.setAttribute('data-active', 'true');
  dialog.setAttribute('data-open', 'true');
  //requestAnimationFrame to ensure VoiceOver moves focus to dialog
  requestAnimationFrame(() => dialog.querySelector('h1').focus()); 

  //used div instead of pseudo-element to allow event handler attachment
  const backDrop = document.createElement('div');
  backDrop.classList.add('backdrop');
  backDrop.addEventListener('click', clozDialog);
  dialog.before(backDrop);

  //for screen readers that dont support aria-modal
  pgContentCtrls.forEach((ctrl) => {
    ctrl.tabIndex = -1;
  });
  pgContent.setAttribute('aria-hidden', 'true');

  //ensures that only the dialog scrolls while it is open
  pgBody.setAttribute('data-prevent-scroll', 'true');
}

function clozDialog() {
  dialog.removeAttribute('data-open');
  dialog.previousElementSibling.remove(); //removes backdrop
  pgContentCtrls.forEach((ctrl) => {
    ctrl.removeAttribute('tabindex');
  });
  pgContent.removeAttribute('aria-hidden');
  pgBody.removeAttribute('data-prevent-scroll');
  dialogTrigger.focus();
  // since keyboard shortcuts isn't activated, button doesn't need to persist; focus keeps it visible as long as reqd
  if (!dialog.querySelector('input[type="checkbox"]').checked) dialogTrigger.removeAttribute('data-active');
}
