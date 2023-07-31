export default class PreviewData extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const fragment = document.createDocumentFragment();

    const shadowStyle = document.createElement('style');
    shadowStyle.textContent = `
      :host {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      }
      span {
        flex: 1 1 auto;
        font-weight: 700;
        font-size: calc(var(--base-font-size) * 1.25);
      }
    `;
    fragment.append(shadowStyle);

    for (let i = 1; i <= 7; i++) {
      let shadowElem = document.createElement('span');
      shadowElem.setAttribute(`col${i}`, '');
      fragment.append(shadowElem);
    }
    
    this.shadowRoot.append(fragment);
  }

  static get observedAttributes() {
    return ['data-col1', 'data-col2', 'data-col3', 'data-col4', 'data-col5', 'data-col6', 'data-col7'];
  }

  attributeChangedCallback(attr, _, value) {
    let correspondingAtttr = attr.replace('data-', '');
    this.shadowRoot.querySelector(`span[${correspondingAtttr}]`).textContent = value;
  }
}
