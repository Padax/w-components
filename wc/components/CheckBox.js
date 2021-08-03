/*
import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  .checkbox{
    margin:10px;
    display:inline-flex;
    align-items:center;
    cursor:pointer;
  }
  .disabled{
    cursor:default;
    color:var(--color-gray-30)
  }
  .checkbox:hover>.filled{
    color:var(--color-primary-40)
  }
  .checkbox:active>.icon{
    color:var(--color-primary-60)
  }
  .checkbox>.icon{
    font-family:"Icons";font-size:1.5rem;
    margin-right:5px;
  }
  .checkbox>.filled{
    font-family:"Icons-Filled";
  }
  .disabled>.icon{
    color:var(--color-gray-10)
  }
  .disabled:hover>.filled{
    color:var(--color-gray-10)
  }
  .disabled:active>.icon{
    color:var(--color-gray-10)
  }
`;
class CheckBox extends WComponent{
  static get observedAttributes(){
    return ["checked", "disabled"];
  }
  static defaultValues={
    checked:false,
    disabled:false
  };
  constructor(){
    super();
  }
  componentWillRender(){
    this.checked=AttributeParser.parseBoolAttr(
      this.getAttribute("checked"),
      this.getDefaultValueByName("checked")
    );
    this.disabled=AttributeParser.parseBoolAttr(
      this.getAttribute("disabled"),
      this.getDefaultValueByName("disabled")
    );
  }
  attributeChangedCallback(name, oldValue, newValue){
    console.log(name, oldValue, newValue);
    if(name==="checked"){
      this.checked=(newValue==="true");
      this.render();
    }else if(name==="disabled"){
      this.disabled=(newValue==="true");
      this.render();
    }
  }
  toggle(){
    if(this.disabled){
      return;
    }
    this.checked=!this.checked;
    this.render();
  }
  render(){
    if(this.checkbox!==undefined){
      this.checkbox.remove();
    }
    this.checkbox=DOM.create("div", {props:{
      className:"checkbox"+(this.disabled?" disabled":"")
    }, events:{
      click:()=>{
        this.toggle();
      }
    }}, this.shadowRoot);
    DOM.create("div", {props:{
      className:"icon"+(this.checked?" filled":""),
      innerHTML:(this.checked?"&#xf28e;":"&#xf292;")
    }}, this.checkbox);
    DOM.create("slot", {}, this.checkbox);
  }
}
CheckBox.prototype.stylesheet=stylesheet;
export default CheckBox;
*/
import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 0; hieght: 0;
  }
  .icon {
    color: var(--color-gray-30);
    margin-right: 5px;
  }
  .icon:before {
    content: '\\f292';
    font-family: var(--icon-font-regular);
    font-size: var(--icon-font-size);
    vertical-align: middle;
  }
  .icon:hover {
    color: var(--color-primary-60);
  }

  input:checked + .icon:before {
    content: '\\f28e';
    font-family: var(--icon-font-filled)
  }
  input:checked + .icon, 
  input:checked:active + .icon {
    color: var(--color-primary-60);
  }
  input:checked + .icon:hover {
    color: var(--color-primary-40);
  }

  input:disabled:checked + .icon:before {
    content: '\\f28e';
    font-family: var(--icon-font-regular)
  }
  input:disabled + .icon,
  input:disabled:active + .icon {
    color: var(--color-gray-10);
  }
  input:disabled + .icon:hover {
    color: var(--color-gray-10);
  }
  input:disabled + .icon + slot {
    color: var(--color-gray-30);
  }
`;
class CheckBox extends WComponent{
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
    
    const checkboxProps = { type: 'checkbox' };
    const checkboxAttrs = {};
    if(checked) { checkboxAttrs.checked = true; }
    if(disabled) { checkboxAttrs.disabled = true; }
    DOM.create('input', { props: checkboxProps, attrs: checkboxAttrs }, ctn);

    const iconProps = { className: 'icon' };
    DOM.create('span', { props: iconProps }, ctn);

    DOM.create('slot', {}, ctn);
  }
}
CheckBox.prototype.stylesheet=stylesheet;
export default CheckBox;