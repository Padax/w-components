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
    filter:opacity(70%);
    border-width:0px;
    cursor:default;
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
    filter:opacity(70%);
    cursor:default;
  }
  /* .select>option */
  .select>option{
    padding:5px 0px;
  }
  .select>option.placeholder{
    color:var(--color-gray-100);
  }
  .select>option:disabled{
    color:var(--color-gray-40);
    filter:opacity(70%);
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
    const selectAttrs = {};
    if(this.disabled) { selectAttrs.disabled = true; }
    const selectProps = {className:'select ' + this.appearance};
    this.select=DOM.create('select', {
      attrs: selectAttrs,
      props: selectProps,
      events:{
        change:()=>{
          this.value=this.select.options[this.selectedIndex].value;
        }
      }
    }, this.shadowRoot);
    if(this.placeholder){
      this.select.add(DOM.create('option', {props:{
        value:'',
        className:'placeholder',
        textContent:this.placeholder
      }}));
    }
    DOM.create('slot', {events:{
      slotchange:()=>{
        // remove first
        let options=this.select.querySelectorAll('option.w-option');
        options.forEach((option)=>{
          option.remove();
        });
        // re-add
        options=this.querySelectorAll('w-option');
        options.forEach((option, index)=>{
          const attrs={};
          if(option.value){
            attrs.value=option.value;
          }
          if(option.disabled){
            attrs.disabled=true;
          }
          if(option.selected){
            attrs.selected=true;

          }
          this.select.add(DOM.create('option', {attrs, props:{
            className:'w-option',
            textContent:option.textContent
          }}));
        });
      }
    }}, this.shadowRoot);
  }
  update({ name, newValue } = {}) {
    const value = this.parseAttributeValueByName(name, newValue);
    console.log(name, value);
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
        const placeholderOption=this.select.querySelector('option.placeholder');
        if(placeholderOption===null){
          this.select.add(DOM.create('option', {props:{
            value:'',
            className:'placeholder',
            textContent:this.placeholder
          }}), this.select.options[0]);
        }else{
          DOM.modify(placeholderOption, {props:{textContent:value}});
        }
        break;
      case 'value':
        this.select.value=value;
        break;
      default:
        this.select[name]=value;
    }
  }
}
Select.prototype.stylesheet=stylesheet;
export default Select;