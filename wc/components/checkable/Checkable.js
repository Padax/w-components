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
  static defaultValues = {
    checked: false,
    disabled: false
  };
  static get observedAttributes() {
    return [ 'checked', 'disabled' ];
  }

  constructor() {
    super();
    this.shadowRoot.querySelector('input').addEventListener('change', e => {
      this.checked = e.target.checked;
    });
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

  attributeChangedCallback() {
    const input = this.shadowRoot.querySelector('input');
    if(input) {
      if(this.checked) { 
        input.checked = true; 
      } else {
        input.removeAttribute('checked');
      }
      if(this.disabled) { 
        input.disabled = true; 
      } else {
        input.removeAttribute('disabled');
      }
    }
  }
  
  get checked() {
    return this.getAttribute('checked') === 'true';
  }
  set checked(value) {
    this.setAttribute('checked', AttributeParser.parseBoolAttr(
      value, this.getDefaultValueByName('checked')
    ));
  }

  get disabled() {
    return this.getAttribute('disabled') === 'true';
  }
  set disabled(value) {
    this.setAttribute('disabled', AttributeParser.parseBoolAttr(
      value, this.getDefaultValueByName('disabled')
    ));
  }

}
Checkable.prototype.stylesheet=stylesheet;
Checkable.prototype.type = 'radio';
export default Checkable;