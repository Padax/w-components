import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  button{
    box-sizing: border-box;
    display: inline-flex; align-items: center; justify-content: center;
    font-family:var(--font-family);
    border-width:1px;border-style:solid;border-radius:4px;
    color:var(--color-gray-0);
    cursor:pointer;transition:background-color 0.2s, border-color 0.2s;
    vertical-align: middle;
  }

  /* color */
  button.primary {
    background-color:var(--color-primary-60);
    border-color:var(--color-primary-60);
  }
  button.primary:hover{
    background-color:var(--color-primary-40);
    border-color:var(--color-primary-40);
  }
  button.primary:active{
    background-color:var(--color-primary-70);
    border-color:var(--color-primary-70);
  }
  button.critical{
    background-color:var(--color-critical-60);
    border-color:var(--color-critical-60);
  }
  button.critical:hover{
    background-color:var(--color-critical-40);
    border-color:var(--color-critical-40);
  }
  button.critical:active{
    background-color:var(--color-critical-70);
    border-color:var(--color-critical-70);
  }
  button.gray {
    background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
    color:var(--color-gray-90);
  }
  button.gray:hover{
    background-color:var(--color-gray-20);
    border-color:var(--color-gray-20);
  }
  button.gray:active{
    background-color:var(--color-gray-30);
    border-color:var(--color-gray-30);
  }
  button.none,
  button.none:hover,
  button.none:active {
    background-color: transparent;
    border-color: transparent;
    color: var(--color-gray-90);
  }

  /* outlined */
  button.outlined {
    background-color:transparent;
    border-width:1px;
  }
  /* outline color */
  button.outlined.primary {
    border-color:var(--color-primary-60);
    color:var(--color-primary-60);
  }
  button.outlined.primary:hover{
    background-color:var(--color-primary-10);
  }
  button.outlined.primary:active{
    background-color:var(--color-primary-20);
  }
  button.outlined.critical{
    border-color:var(--color-critical-60);
    color:var(--color-critical-60);
  }
  button.outlined.critical:hover{
    background-color:var(--color-critical-10);
  }
  button.outlined.critical:active{
    background-color:var(--color-critical-20);
  }
  button.outlined.gray {
    background-color:var(--color-gray-0);
    border-color:var(--color-gray-90);
    color:var(--color-gray-90);
  }
  button.outlined.gray:hover{
    background-color:var(--color-gray-10);
  }
  button.outlined.gray:active{
    background-color:var(--color-gray-20);
  }

  /* disabled */
  button:disabled,
  button:disabled:hover, button:disabled:active,
  button.outlined:disabled,
  button.outlined:disabled:hover {
    background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
    color:var(--color-gray-40);
    cursor:default;
  }
  /* disabled outlined */
  button.outlined:disabled,
  button.outlined:disabled:hover {
    border-color:var(--color-gray-40);
  }
  
  /* size */
  button.xl {
    height: 48px; line-height: 48px;
    font-size:calc(var(--font-size-normal) * 1.5);
    padding: 0 32px;
  }
  button.lg {
    height: 38px; line-height: 38px;
    font-size:calc(var(--font-size-normal) * 1.25);
    padding: 0 24px;
  }
  button.md {
    height: 32px; line-height: 32px;
    font-size:var(--font-size-normal);
    padding: 0 20px;
  }
  button.sm {
    height: 29px; line-height: 29px;
    font-size:calc(var(--font-size-normal) * 0.875);
    padding: 0 12px;
  }

  /* display */
  button.block{
    display: flex; 
    width:100%;
  }
`;
class Button extends WComponent{
  static attributes = {
    disabled: {
      name: 'disabled', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    color: {
      name: 'color', defaultValue: 'primary', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^primary$|^critical$|^gray$|^none$/
      )
    },
    outlined: {
      name: 'outlined', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    size: {
      name: 'size', defaultValue: 'md', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^sm$|^md$|^lg$|^xl$/
      )
    },
    display: {
      name: 'display', defaultValue: 'inline-block', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^inline-block$|^block$/
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  init(){
    const settings = { props: this.renderProps(), attrs: this.renderAttrs() };

    const btn = DOM.create("button", settings, this.shadowRoot);
    DOM.create("slot", {}, btn);
    this.renderStylesheet();
  }
  update({ name, newValue }){
    const value = this.parseAttributeValueByName(name, newValue);
    const settings = {
      props: this.renderProps({ [name]: value }),
      attrs: this.renderAttrs({ [name]: value })
    };
    
    const btn = this.shadowRoot.querySelector('button');
    DOM.modify(btn, settings);

    if(name === 'display') {
      this.renderStylesheet(value);
    }
  }
  renderProps({ display, size, color, outlined} = {}) {
    const classList = [ 
      display ? display : this.display, 
      size ? size : this.size, 
      color ? color : this.color 
    ];
    if(outlined || outlined === undefined && this.outlined) {
      classList.push('outlined');
    }
    return { className: classList.join(' ') };
  }
  renderAttrs({ disabled } = {}) {
    const attrs = { removes: [], part: 'button' };
    if(disabled || disabled === undefined && this.disabled){
      attrs["disabled"]=true;
    } else {
      attrs.removes.push("disabled");
    }
    return attrs;
  }
  renderStylesheet(display) {
    this.setStylesheet(`:host { display: ${display ? display : this.display} }`, 'display');
  }
}
Button.prototype.stylesheet=stylesheet;
export default Button;