import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  :host {
    display: inline-block;
  }
  :host > input {
    width:100%;box-sizing:border-box;
    font-size:var(--font-size-small);
    padding:5px 8px;
    border-width:1px;
    border-style:solid;
    border-color:var(--color-gray-50);
  }
`;

class TextInput extends WComponent{

  static attributes = {
    placeholder: { name: 'placeholder', defaultValue: '' },
    value: { name: 'value', defaultValue: '' },
    name: { name: 'name' }
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
    DOM.create('input', { attrs: inputAttrs, events:{
      change: this.handleChange.bind(this),
      input: this.handleInput.bind(this)
    }}, this.shadowRoot);
  }
  update({ name, newValue } = {}) {
    const input = this.shadowRoot.querySelector('input');
    const value = this.parseAttributeValueByName(name, newValue);
    input[name]=value;
  }
  handleChange(e){
    this.setAttribute("value", e.target.value);
    this.dispatchEvent(new Event("change", e));
  }
  handleInput(e){
    this.setAttribute("value", e.target.value);
  }
}
TextInput.prototype.stylesheet=stylesheet;
export default TextInput;