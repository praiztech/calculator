export default function definePointerhighlighting() {
  document.querySelectorAll('.theme-widget, button').forEach((ctrl) => {
    ctrl.addEventListener('pointerenter', highlightCtrl);
    ctrl.addEventListener('pointerleave', highlightCtrl);
  })
}

//provides fine-grained control of widget highlighting on pointer devices
function highlightCtrl(evt) {
  if (!evt.isPrimary) return; //ensures single pointer interaction on multi-touch devices

  let pointerTarget = evt.currentTarget;
  let focusedElem = document.activeElement; 
  switch (evt.type) {
    case 'pointerenter':
      pointerTarget.setAttribute('data-hover', 'true');
      if (focusedElem !== document.body) { //to prevent disparate highlighting from focus and pointer styling
        focusedElem.blur(); 
      }
      break;
    case 'pointerleave':
      pointerTarget.removeAttribute('data-hover');
      if (pointerTarget.contains(focusedElem)) { //to simultaneously remove focus styling and pointer highlighting
        focusedElem.blur();
      }
      break;
  }
}
