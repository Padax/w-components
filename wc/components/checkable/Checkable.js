import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  div {
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 0; hieght: 0; margin: 0;
  }
  .icon {
    cursor: pointer;
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
  slot {
    cursor: pointer;
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
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    disabled: {
      name: 'disabled', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    value: { name: 'value', defaultValue: 'on' },
    name: { name: 'name' }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
    this.bindEvents();
  }

  update(args) {
    const {name, oldValue, newValue} = args;
    console.log(name, oldValue, newValue); // called right after init because first-added attribute will trigger attributeChangedCallback
    if(name === this.constructor.attributes.checked.name
       || name === this.constructor.attributes.disabled.name) {
      const input = this.shadowRoot.querySelector('input');
      const value = this.getAttributeParserByName(name)(newValue, this.constructor.attributes[name]);
      if(value) {
        input.setAttribute(name, value);
      } else {
        input.removeAttribute(name);
      }

      // Trigger change event
      if(name === this.constructor.attributes.checked.name && oldValue !== newValue) {
        this.dispatchEvent(this.events.change);
      }
    }
  }
  bindEvents() {
    this.events = {
      change: new Event('change'),
      click: new Event('click')
    };
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

  clickHandler = e => {
    if(!this.disabled) {
      this.checked = !this.checked;
    }
  };

}
Checkable.prototype.stylesheet=stylesheet;
Checkable.prototype.type = 'radio';
export default Checkable;