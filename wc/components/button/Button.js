import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  button{
    box-sizing: border-box;
    display: inline-flex; align-items: center; justify-content: center;
    font-family:var(--font-family);
    border-width:1px;border-color:var(--color-primary-60);border-style:solid;border-radius:4px;
    background-color:var(--color-primary-60);color:var(--color-gray-0);
    cursor:pointer;transition:background-color 0.2s, border-color 0.2s;
    vertical-align: middle;
  }
  button:hover{
    background-color:var(--color-primary-40);
    border-color:var(--color-primary-40);
  }
  button:active{
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
  /* outline */
  button.outlined {
    background-color:transparent;
    border-width:1px;
  }
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
  /* disabled */
  button:disabled{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
    cursor:default;
  }
  button:disabled:hover, button:disabled:active{
    color:var(--color-gray-30);background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
  }
  button[class*="outline-"]:disabled{
    border-color:var(--color-gray-40);
  }
  button[class*="outline-"]:disabled:hover{
    border-color:var(--color-gray-40);
  }
  /* size */
  button.xl {
    height: 48px;
    font-size:calc(var(--font-size-normal) * 1.5);
    padding: 0 32px;
  }
  button.lg {
    height: 38px;
    font-size:calc(var(--font-size-normal) * 1.25);
    padding: 0 24px;
  }
  button.md {
    height: 32px;
    font-size:var(--font-size-normal);
    padding: 0 20px;
  }
  button.sm {
    height: 29px;
    font-size:calc(var(--font-size-normal) * 0.875);
    padding: 0 12px;
  }
  /* block */
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
        value, attr.defaultValue, /^primary$|^critical$/
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
  }
  update({ name, newValue }){
    const value = this.parseAttributeValueByName(name, newValue);
    const settings = {
      props: this.renderProps({ [name]: value }),
      attrs: this.renderAttrs({ [name]: value })
    };
    
    const btn = this.shadowRoot.querySelector('button');
    DOM.modify(btn, settings);
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
    const attrs = { removes: [] };
    if(disabled || disabled === undefined && this.disabled){
      attrs["disabled"]=true;
    } else {
      attrs.removes.push("disabled");
    }
    return attrs;
  }
}
Button.prototype.stylesheet=stylesheet;
export default Button;