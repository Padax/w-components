import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  label {
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 0; hieght: 0;
  }
  .icon {
    cursor: pointer;
    color: var(--color-gray-30);
  }
  .icon:before {
    content: '\\f644';
    font-family: var(--icon-font-regular);
    font-size: var(--icon-font-size);
    vertical-align: middle;
  }
  .icon:hover {
    color: var(--color-primary-60);
  }
  slot {
    cursor: pointer;
    margin-left: 8px;
  }

  input:checked + .icon:before {
    content: '\\f64e';
    font-family: var(--icon-font-filled)
  }
  input:checked + .icon, 
  input:checked:active + .icon {
    color: var(--color-primary-60);
  }
  input:checked + .icon:hover {
    color: var(--color-primary-40);
  }

  input:disabled + .icon,
  input:disabled:active + .icon {
    color: var(--color-gray-10);
    cursor: default;
  }
  input:disabled + .icon:hover {
    color: var(--color-gray-10);
  }
  input:disabled + .icon + slot {
    color: var(--color-gray-30);
    cursor: default;
  }
`;

class Checkable extends WComponent{
  static defaultValues = {
    checked: false,
    disabled: false
  };

  constructor() {
    super();
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

    const ctn = DOM.create('label', null, this.shadowRoot);
    
    const radioProps = { type: this.type };
    const radioAttrs = {};
    if(checked) { radioAttrs.checked = true; }
    if(disabled) { radioAttrs.disabled = true; }
    DOM.create('input', { props: radioProps, attrs: radioAttrs }, ctn);

    const iconProps = { className: 'icon' };
    DOM.create('span', { props: iconProps }, ctn);

    DOM.create('slot', {}, ctn);
  }
}
Checkable.prototype.stylesheet=stylesheet;
Checkable.prototype.type = 'radio';
export default Checkable;