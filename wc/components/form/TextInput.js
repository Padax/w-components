import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  :host {
    display:inline-flex;
  }
  :host > input {
    display:block;width:100%;
    font-family:var(--font-family);
    font-size:var(--font-size-normal);
    line-height: var(--line-height-normal);
    color:var(--color-gray-100);
    padding:8px 16px;
    border-width:1px;
    border-style:solid;
    border-color:var(--color-gray-30);
    border-radius:4px;
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
  :host > textarea.growable{
    overflow-y:hidden;
    height:var(--line-height-normal);
    resize:none;
  }
  :host > input:hover, :host > textarea:hover{
    border-color:var(--color-gray-40);
  }
  :host > input:active, :host > textarea:active,
  :host > input:focus, :host > textarea:focus{
    border-color:var(--color-gray-60);
    outline-width:0px;
  }
  :host > input:disabled, :host > textarea:disabled{
    border-width:0px;
    background-color:var(--color-gray-10);
    color:var(--color-gray-40);
  }
  /* filled */
  :host > input.filled{
    border-width:0px;
    border-bottom-width:1px;
    border-radius:4px 4px 0px 0px;
    background-color:var(--color-gray-10);
  }
  :host > textarea.filled{
    border-width:0px;
    border-bottom-width:1px;
    border-radius:4px 4px 0px 0px;
    background-color:var(--color-gray-10);
  }
  :host > input.filled:hover, :host > textarea.filled:hover{
    background-color:var(--color-gray-20);
  }
  :host > input.filled:active, :host > textarea.filled:active,
  :host > input.filled:focus, :host > textarea.filled:focus{
    background-color:var(--color-gray-30);
  }
  :host > input.filled:disabled, :host > textarea.filled:disabled{
    background-color:var(--color-gray-10);
    color:var(--color-gray-40);
    border-color:var(--color-gray-30);
  }
`;

class TextInput extends WComponent{

  static attributes = {
    type: { 
      name: 'type', defaultValue: 'single',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^single$|^growable$|^multiple$/
      )
    },
    appearance: {
      name: 'appearance', defaultValue: 'outlined',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^outlined$|^filled$/
      )
    },
    placeholder: { name: 'placeholder', defaultValue: '' },
    value: { name: 'value', defaultValue: '' },
    name: { name: 'name' },
    disabled: {
      name: 'disabled', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor() {
    super();
  }
  init() {
    const inputAttrs = { type: 'text' };
    if(this.placeholder) { inputAttrs.placeholder = this.placeholder; }
    if(this.value) { inputAttrs.value = this.value; }
    if(this.name) { inputAttrs.name = this.name; }
    if(this.disabled) { inputAttrs.disabled = true; }
    const inputProps = { className: this.appearance}
    switch(this.type){
      case 'single':
        this.input=DOM.create('input', { attrs: inputAttrs, props:inputProps, events:{
          change: this.handleChange.bind(this),
          input: this.handleInput.bind(this)
        }}, this.shadowRoot);
        break;
      case 'growable':
        inputProps.className+=' growable';
        inputProps.textContent=this.textContent;
        this.input=DOM.create('textarea', { attrs: inputAttrs, props:inputProps, events:{
          change: this.handleChange.bind(this),
          input: this.handleGrowableInput.bind(this)
        }}, this.shadowRoot);
        break;
      case 'multiple':
        inputProps.textContent=this.textContent;
        this.input=DOM.create('textarea', { attrs: inputAttrs, props:inputProps, events:{
          change: this.handleChange.bind(this),
          input: this.handleInput.bind(this)
        }}, this.shadowRoot);
        break;
    }
  }
  update({ name, newValue } = {}) {
    const value = this.parseAttributeValueByName(name, newValue);
    this.input[name]=value;
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
TextInput.prototype.stylesheet=stylesheet;
export default TextInput;