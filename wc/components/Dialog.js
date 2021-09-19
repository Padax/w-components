import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  .dialog{
    width:300px;
    position:fixed;left:calc(50% - 150px);top:100px;
    z-index:10;
  }
  .dialog>::slotted(.head){
    background-color:#333333;color:#ffffff;padding:10px;
  }
  .dialog>::slotted(.main){
    padding:10px;background-color:#dddddd;
  }
`;
class Dialog extends WComponent{
  
  static attributes = {
    open: {
      name: 'open', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
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
    this.dialog=DOM.create("div", {props:{className:"dialog"}});
    this.head=DOM.create("slot", {props:{name:"head"}}, this.dialog);
    this.main=DOM.create("slot", {props:{name:"main"}}, this.dialog);
  }
  update({ name, newValue }){
    const attr = this.constructor.attributes.open;
    if(name === attr.name){
      if(attr.parser(newValue, attr.defaultValue)){
        this.shadowRoot.appendChild(this.dialog);
      }else{
        this.dialog.remove();
      }
    }
  }
}
Dialog.prototype.stylesheet=stylesheet;
export default Dialog;