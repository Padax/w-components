import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  :host {
    display:inline-flex;
  }
  :host > textarea {
    display:block;width:100%;
    font-family:var(--font-family);
    font-size:var(--font-size-normal);
    line-height:var(--line-height-normal);
    color:var(--color-gray-100);
    padding:8px 16px;
    border-width:1px;
    border-style:solid;
    border-color:var(--color-gray-30);
    border-radius:4px;
  }
  :host > textarea.resize-both{
    resize:both;
  }
  :host > textarea.resize-vertical{
    resize:vertical;
  }
  :host > textarea.resize-horizontal{
    resize:horizontal;
  }
  :host > textarea.resize-none{
    resize:none;
  }
  :host > textarea.growable{
    resize:none;
    overflow-y:hidden;
    height:var(--line-height-normal);
  }
  :host > textarea:hover{
    border-color:var(--color-gray-40);
  }
  :host > textarea:active,
  :host > textarea:focus{
    border-color:var(--color-gray-60);
    outline-width:0px;
  }
  :host > textarea:disabled{
    border-width:0px;
    background-color:var(--color-gray-10);
    color:var(--color-gray-40);
    filter:opacity(70%);
  }
  /* filled */
  :host > textarea.filled{
    border-width:0px;
    border-bottom-width:1px;
    border-radius:4px 4px 0px 0px;
    background-color:var(--color-gray-10);
  }
  :host > textarea.filled:hover{
    background-color:var(--color-gray-20);
  }
  :host > textarea.filled:active,
  :host > textarea.filled:focus{
    background-color:var(--color-gray-30);
  }
  :host > textarea.filled:disabled{
    background-color:var(--color-gray-10);
    color:var(--color-gray-40);
    border-color:var(--color-gray-30);
    filter:opacity(70%);
  }
`;

class TextArea extends WComponent{
  static title = 'TextArea';
  static description = 'Text input with mutiple-lines.';
  static tagName = 'textarea';
  static attributes = {
    type: { 
      name: 'type', defaultValue: 'normal',
      possibleValues: 'normal|growable',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^normal$|^growable$/
      )
    },
    resize:{
      name: 'resize', defaultValue: 'both',
      possibleValues: 'both|horizontal|vertical|none',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^both$|^horizontal$|^vertical$|^none$/
      )
    },
    appearance: {
      name: 'appearance', defaultValue: 'outlined',
      possibleValues: 'outlined|filled',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^outlined$|^filled$/
      )
    },
    placeholder: { name: 'placeholder', defaultValue: '', possibleValues: '[Any String]' },
    value: { name: 'value', defaultValue: '', possibleValues: '[Any String]' },
    name: { name: 'name', possibleValues: '[Any String]' },
    disabled: {
      name: 'disabled', defaultValue: false, 
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static methods = null;
  static childComponents = null;
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
  }
  init() {
    // generate attributes
    const inputAttrs = {};
    if(this.placeholder) { inputAttrs.placeholder = this.placeholder; }
    if(this.value) { inputAttrs.value = this.value; }
    if(this.name) { inputAttrs.name = this.name; }
    if(this.disabled) { inputAttrs.disabled = true; }
    // generate properties
    const inputProps = {
      textContent:this.textContent,
      className: this.appearance+" "+this.type+" resize-"+this.resize
    };
    // generate input event handler
    let inputHandler=this.handleInput.bind(this);
    if(this.type==='growable'){
      inputHandler=this.handleGrowableInput.bind(this);
    }
    // generate input element inside
    this.input=DOM.create('textarea', { attrs: inputAttrs, props:inputProps, events:{
      change: this.handleChange.bind(this),
      input: inputHandler
    }}, this.shadowRoot);
  }
  update({ name, newValue } = {}) {
    const value = this.parseAttributeValueByName(name, newValue);
    switch(name){
      case 'type':
      case 'resize':
      case 'appearance':
        const className=this.appearance+" "+this.type+" resize-"+this.resize;
        DOM.modify(this.input, {props:{className:className}});
        break;
      default:
        this.input[name]=value;
    }
  }
  handleChange(e){
    this.setAttribute("value", e.target.value);
    this.dispatchEvent(new Event("change", e));
  }
  handleInput(e){
    this.setAttribute("value", e.target.value);
  }
  handleGrowableInput(e){
    const element=e.target;
    const styles=window.getComputedStyle(element);
    const padding=parseInt(styles.getPropertyValue('padding-top'))+parseInt(styles.getPropertyValue('padding-bottom'));
    element.style.height=""; // important for get scrollHeight not depending on height
    element.style.height=(element.scrollHeight-padding)+"px"; // minus padding top and bottom
    this.setAttribute("value", element.value);
  }
}
TextArea.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(TextArea);

export default TextArea;