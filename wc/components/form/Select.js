import WComponent, { DOM, AttributeParser } from "../../WComponent.js";

const stylesheet=`
  .select{
    display:inline-flex;align-items:center;
    padding:8px 16px;
    border:1px solid var(--color-gray-30);
    border-radius:4px;
    color:var(--color-gray-60);
    cursor:pointer;
  }
  .select:after{
    content:'\\f261';
    font-family:var(--icon-font-filled);
    margin-left:8px;
  }
  .select:hover{
    border-color:var(--color-gray-40);
  }
  .select:active,
  .select:focus{
    border-color:var(--color-gray-60);
  }
  .select[disabled]{
    color:var(--color-gray-40);
    background-color:var(--color-gray-10);
    border-width:0px;
    cursor:default;
  }
  .select[disabled]:after{
    color:var(--color-gray-40);
  }
  /* filled */
  .filled{
    border-width:0px;
    border-bottom-width:1px;
    border-radius:4px 4px 0px 0px;
    background-color:var(--color-gray-10);
  }
  .filled:hover{
    background-color:var(--color-gray-20);
  }
  .filled:active,
  .filled:focus{
    background-color:var(--color-gray-30);
  }
  .filled[disabled]{
    color:var(--color-gray-40);
    background-color:var(--color-gray-10);
    border-width:0px 0px 1px 0px;
    border-color:var(--color-gray-20);
    cursor:default;
  }
`;

class Select extends WComponent{

  static attributes = {
    appearance: {
      name: 'appearance', defaultValue: 'outlined',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^outlined$|^filled$/
      )
    },
    placeholder: { name: 'placeholder', defaultValue: '' },
    value: {
      name: 'value', defaultValue: null
    },
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
    const selectAttrs = {};
    if(this.disabled) { selectAttrs.disabled = true; }
    const selectProps = {className:'select ' + this.appearance};
    if(this.placeholder) { selectProps.textContent = this.placeholder; }
    this.select=DOM.create('div', { attrs: selectAttrs, props:selectProps}, this.shadowRoot);
    this.options=DOM.create('slot', {}, this.shadowRoot);
  }
  update({ name, newValue } = {}) {
    const value = this.parseAttributeValueByName(name, newValue);
    switch(name){
      case 'appearance':
        DOM.modify(this.select, {props:{className:'select ' + this.appearance}});
        break;
      case 'disabled':
        if(value){
          DOM.modify(this.select, {attrs:{disabled:true}});
        }else{
          DOM.modify(this.select, {attrs:{removes:['disabled']}});
        }
        break;
      case 'placeholder':
        DOM.modify(this.select, {props:{textContent:value}});
        break;
      default:
        this.select[name]=value;
    }
  }
}
Select.prototype.stylesheet=stylesheet;
export default Select;