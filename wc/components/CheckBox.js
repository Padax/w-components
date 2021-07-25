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
    super(stylesheet);
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
  /*
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
  */
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
export default CheckBox;