import { DOM, AttributeParser } from "../../../WComponent.js";
import WInputComponent from "../WInputComponent.js";


const stylesheet=`
  :host {
    display: inline-block;
  }
  label {
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 0; hieght: 0;
    margin: 0;
  }
  .icon {
    cursor: pointer;
    color: var(--color-gray-30);
    margin-right: 8px;
  }
  .icon:before {
    content: '\\f292';
    font-family: var(--icon-font-regular);
    font-size: var(--icon-font-size);
    vertical-align: middle;
  }
  label:hover .icon {
    color: var(--color-primary-60);
  }
  .text {
    cursor: pointer;
  }

  input:checked + .icon:before {
    content: '\\f28e';
    font-family: var(--icon-font-filled)
  }
  input:checked + .icon, 
  input:checked:active + .icon {
    color: var(--color-primary-60);
  }
  label:hover input:checked + .icon {
    color: var(--color-primary-40);
  }

  input:disabled + .icon,
  input:disabled:active + .icon {
    color: var(--color-gray-10);
    cursor: default;
  }
  input:disabled + .icon + slot {
    color: var(--color-gray-30);
    cursor: default;
  }
  label:hover input:disabled + .icon {
    color: var(--color-gray-10);
  }
`;

class Checkable extends WInputComponent{
  static defaultValues = {
    checked: false,
    disabled: false,
    label: ''
  };

  constructor(type = 'checkbox') {
    super();
    this.type = type;
  }

  attachShadowDOM() {
    const shadowRoot = DOM.create('div', null, this, DOM.CREATE_MODE.AFTER);
    this.createCustomShadowRoot(shadowRoot);
  }
  render(){
    const checked = AttributeParser.parseBoolAttr(
      this.getAttribute('checked'),
      this.getDefaultValueByName('checked')
    );
    const disabled = AttributeParser.parseBoolAttr(
      this.getAttribute('disabled'),
      this.getDefaultValueByName('disabled')
    );
    const text = AttributeParser.parseStringAttr(
      this.getAttribute('label'),
      this.getDefaultValueByName('label'),
      /[^]*/  // Match every string
    );

    const ctn = DOM.create('label', {}, this.customShadowRoot.shadowRoot);

    const inputProps = { type: this.type };
    const inputAttrs = {};
    if(checked) { inputAttrs.checked = true; }
    if(disabled) { inputAttrs.disabled = true; }
    DOM.create('input', { props: inputProps, attrs: inputAttrs }, ctn);

    const iconProps = { className: 'icon' };
    DOM.create('span', { props: iconProps }, ctn);

    const textProps = { className: 'label', textContent: text };
    DOM.create('span', { props: textProps }, ctn);
  }
  setStylesheet(){
    DOM.create('style', { props: { textContent: this.stylesheet } }, this.customShadowRoot.shadowRoot);
  }
}
Checkable.prototype.stylesheet=stylesheet;
export default Checkable;