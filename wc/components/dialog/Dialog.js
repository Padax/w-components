import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  .dialog{
    width:300px;
    position:fixed;left:calc(50% - 150px);top:100px;
    z-index:10;
  }
  .dialog>.head{
    background-color:var(--color-gray-80);
    color:var(--color-gray-10);padding:10px;
  }
  .dialog>.head-empty{
    padding:5px;
  }
  .dialog>slot{
    display:block;padding:10px;
    background-color:var(--color-gray-10);
  }
  .dialog>.footer{
    background-color:var(--color-gray-10);
    padding:10px;text-align:right;
  }
  .dialog>.footer>w-button{
    margin-left:10px;
  }
`;
class Dialog extends WComponent{
  
  static attributes = {
    open: {
      name: 'open', defaultValue: false, 
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    title: {
      name: 'title', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
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
    let headProps={
      className:"head",
      textContent:this.title
    };
    if(headProps.textContent.trim().length===0){
      headProps.className+=" head-empty";
    }

    this.dialog=DOM.create("div", {props:{className:"dialog"}});
    this.head=DOM.create("div", {props:headProps}, this.dialog);
    this.main=DOM.create("slot", {}, this.dialog);
    this.footer=DOM.create("div", {props:{
      className:"footer"
    }}, this.dialog);
  }
  update({ name, newValue }){
    newValue=this.parseAttributeValueByName(name, newValue);
    switch(name){
      case 'open':
        if(newValue){
          this.shadowRoot.appendChild(this.dialog);
        }else{
          this.dialog.remove();
        }
        break;
      case 'title':
        DOM.modify(this.head, {props:{
          textContent:newValue
        }});
        break;
    }
  }
  show(){
    this.open=true;
  }
  close(){
    this.open=false;
  }
}
Dialog.prototype.stylesheet=stylesheet;
export default Dialog;