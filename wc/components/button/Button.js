import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  button {
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

  /* type - outline */
  button.outline {
    background-color:transparent;
    border-width:1px;
  }
  /* outline color */
  button.outline.primary {
    border-color:var(--color-primary-60);
    color:var(--color-primary-60);
  }
  button.outline.primary:hover {
    background-color:var(--color-primary-10);
  }
  button.outline.primary:active {
    background-color:var(--color-primary-20);
  }
  button.outline.critical {
    border-color:var(--color-critical-60);
    color:var(--color-critical-60);
  }
  button.outline.critical:hover {
    background-color:var(--color-critical-10);
  }
  button.outline.critical:active {
    background-color:var(--color-critical-20);
  }
  button.outline.gray {
    background-color:var(--color-gray-0);
    border-color:var(--color-gray-90);
    color:var(--color-gray-90);
  }
  button.outline.gray:hover {
    background-color:var(--color-gray-10);
  }
  button.outline.gray:active {
    background-color:var(--color-gray-20);
  }
  
  /* type - text */
  button.text {
    background-color:transparent;
  }
  /* outline color */
  button.text.primary {
    border-color:transparent;
    color:var(--color-primary-60);
  }
  button.text.primary:hover {
    background-color:var(--color-primary-10);
  }
  button.text.primary:active {
    background-color:var(--color-primary-20);
  }
  button.text.critical {
    border-color:transparent;
    color:var(--color-critical-60);
  }
  button.text.critical:hover {
    background-color:var(--color-critical-10);
  }
  button.text.critical:active {
    background-color:var(--color-critical-20);
  }
  button.text.gray {
    border-color:transparent;
    color:var(--color-gray-90);
  }
  button.text.gray:hover {
    background-color:var(--color-gray-10);
  }
  button.text.gray:active {
    background-color:var(--color-gray-20);
  }

  /* type - link*/
  button.link {
    background-color: transparent;
    border-color :transparent;
    color: var(--color-gray-90);
  }
  button.link:hover {
    background-color: transparent;
    border-color :transparent;
    color: var(--color-gray-60);
  }
  button.link:active {
    background-color: transparent;
    border-color :transparent;
    color: var(--color-primary-60);
  }

  /* disabled */
  button:disabled, button:disabled:hover, button:disabled:active,
  button.outline:disabled, button.outline:disabled:hover, button.outline:disabled:active,
  button.text:disabled, button.text:disabled:hover, button.text:disabled:active {
    background-color:var(--color-gray-10);
    border-color:var(--color-gray-10);
    color:var(--color-gray-40);
    cursor:default;
  }
  /* disabled outline */
  button.outline:disabled,
  button.outline:disabled:hover {
    border-color:var(--color-gray-40);
  }
  /* disabled text */
  button.outline:disabled,
  button.outline:disabled:hover {
    border-color:transparent;
  }
  /* disabled link */ 
  button.link:disabled {
    background-color:transparent;
    border-color:transparent;
  }
  
  /* size */
  button.xl {
    height: 48px; line-height: 48px;
    font-size:calc(var(--font-size-normal) * 1.5);
    padding: 0 32px;
  }
  button.lg {
    height: 40px; line-height: 40px;
    font-size:calc(var(--font-size-normal) * 1.25);
    padding: 0 24px;
  }
  button.md {
    height: 32px; line-height: 32px;
    font-size:var(--font-size-normal);
    padding: 0 20px;
  }
  button.sm {
    height: 28px; line-height: 28px;
    font-size: var(--font-size-normal);
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
        value, attr.defaultValue, /^primary$|^critical$|^gray$/
      )
    },
    type: {
      name: 'type', defaultValue: 'regular',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^outline$|^text$|^link$/
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
    },
    href: { name: 'href', defaultValue: undefined }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
    this.bindEvents();
  }
  bindEvents() {
    this.shadowRoot.addEventListener('click', this.clickHandler);
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
  renderProps({ display, type, size, color } = {}) {
    const classList = [ 
      display ? display : this.display, 
      type ? type: this.type,
      size ? size : this.size, 
      color ? color : this.color
    ];
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

  clickHandler = e => {
    if(this.type === 'link' && typeof this.href === 'string') {
      document.location.href = this.href;
    }
  };
}
Button.prototype.stylesheet=stylesheet;
export default Button;