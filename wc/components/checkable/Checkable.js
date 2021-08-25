import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  label {
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
  label:hover .icon {
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

class Checkable extends WComponent{
  static attributes = {
    checked: {
      name: 'checked', observed: true, defaultValue: false, 
      parser: value => AttributeParser.parseBoolAttr(
        value, this.defaultValue
      )
    },
    disabled: {
      name: 'disabled', observed: true, defaultValue: false, 
      parser: value => AttributeParser.parseBoolAttr(
        value, this.defaultValue
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
    this.shadowRoot.querySelector('input').addEventListener('change', this.inputChangeHandler);
  }

  render(){
    this.checked = this.getAttribute('checked');
    this.disabled = this.getAttribute('disabled');

    const ctn = DOM.create('label', null, this.shadowRoot);
    
    const inputProps = { type: this.type };
    const inputAttrs = {};
    if(this.checked) { inputAttrs.checked = true; }
    if(this.disabled) { inputAttrs.disabled = true; }
    DOM.create('input', { props: inputProps, attrs: inputAttrs }, ctn);

    const iconProps = { className: 'icon' };
    DOM.create('span', { props: iconProps }, ctn);

    DOM.create('slot', {}, ctn);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const input = this.shadowRoot.querySelector('input');
    const value = this.getAttributeParserByName(name)(newValue);
    if(input) {
      input[name] = value;
      if(!value) {
        input.removeAttribute(name);
      }
    }
  }

  inputChangeHandler = e => {
    this.checked = e.target.checked;
    if(typeof this.onchange === 'function') {
      this.onchange.bind(e.target)(e);
    }
  };

}
Checkable.prototype.stylesheet=stylesheet;
Checkable.prototype.type = 'radio';
export default Checkable;