import WComponent, { DOM, AttributeParser } from "../../../WComponent.js";

const stylesheet=`
  :host {
    display: inline-block;
  }
  div {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 0; height: 0; margin: 0;
  }
  .icon {
    color: var(--color-gray-30);
    margin-right: 8px;
  }
  .icon:before {
    content: '\\f644';
    font-family: var(--icon-font-regular);
    font-size: var(--icon-font-size);
    vertical-align: middle;
  }
  div:hover .icon {
    color: var(--color-primary-60);
  }

  input:checked + .icon:before {
    content: '\\f64e';
    font-family: var(--icon-font-filled)
  }
  input:checked + .icon, 
  input:checked:active + .icon {
    color: var(--color-primary-60);
  }
  div:hover input:checked + .icon {
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
  div:hover input:disabled + .icon {
    color: var(--color-gray-10);
  }
`;

class Checkable extends WComponent{
  static attributes = {
    checked: {
      name: 'checked', defaultValue: false, 
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    disabled: {
      name: 'disabled', defaultValue: false, 
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    value: { name: 'value', defaultValue: 'on', possibleValues: 'on' },
    name: { name: 'name', possibleValues: '[Any String]' }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
    this.tabIndex = 0;  // For focus/blur event
  }

  bindEvents() {
    this.shadowRoot.addEventListener('click', this.clickHandler);
  }
  init() {
    const ctn = DOM.create('div', null, this.shadowRoot);
    
    const inputAttrs = { type: this.type };
    if(this.checked) { inputAttrs.checked = true; }
    if(this.disabled) { inputAttrs.disabled = true; }
    if(this.value) { inputAttrs.value = this.value; }
    if(this.name) { inputAttrs.name = this.name; }
    DOM.create('input', { attrs: inputAttrs }, ctn);

    const iconProps = { className: 'icon' };
    DOM.create('span', { props: iconProps }, ctn);

    DOM.create('slot', {}, ctn);
  }
  update({ name, newValue } = {}) {
    const checkedAttr = this.constructor.attributes.checked;
    const disabledAttr = this.constructor.attributes.disabled;
    if(name === checkedAttr.name || name === disabledAttr.name) {
      const input = this.shadowRoot.querySelector('input');
      const value = this.parseAttributeValueByName(name, newValue);
      if(value) {
        input.setAttribute(name, value);
      } else {
        input.removeAttribute(name);
      }
    }
  }

}
Checkable.prototype.stylesheet=stylesheet;
Checkable.prototype.type = 'radio';
export default Checkable;