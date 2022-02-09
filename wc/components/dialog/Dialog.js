import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  .dialog{
    width:600px;
    position:fixed;left:calc(50% - 300px);top:100px;
    z-index:10;border-radius:8px;
    background-color:var(--color-gray-0);
    box-shadow:var(--box-shadow-30);
  }
  .dialog>.head{
    display:flex;align-items:center;
    padding:14px 24px;
    border-bottom:1px solid var(--color-gray-30);
  }
  .dialog>.head>.title{
    flex:auto;
    margin:0px;font-weight:bold;
  }
  .dialog>.head>.close{
    flex:none;
    display:flex;justify-content:center;align-items:center;
    width:28px;height:28px;cursor:pointer;
    font-family:var(--icon-font-regular);
  }
  .dialog>.head>.close:before{
    content:'\\f36b';
    font-size:28px;
  }
  .dialog>slot{
    display:block;
    padding:24px;
    border-bottom:1px solid var(--color-gray-30);
  }
  .dialog>.footer{
    display:flex;align-items:center;
    padding:24px;
  }
  .dialog>.footer>.left{
    flex:auto;
  }
  .dialog>.footer>.right{
    flex:none;
  }
  .dialog>.footer>.right>w-button.main{
    margin-left:16px;
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
    this.dialog=DOM.create("div", {props:{className:"dialog"}});
    this.head=DOM.create("div", {props:{className:"head"}}, this.dialog);
    DOM.create("w-heading", {
      attrs:{level:3},
      props:{className:"title", textContent:this.title}
    }, this.head);
    DOM.create("div", {
      props:{className:"close"}
    }, this.head);
    this.main=DOM.create("slot", {}, this.dialog);
    this.footer=DOM.create("div", {props:{
      className:"footer"
    }}, this.dialog);
    const footerLeft=DOM.create("div", {
      props:{className:"left"}
    }, this.footer);
    DOM.create("w-button", {
      attrs:{type:"link", size:"sm"},
      props:{className:"noteless", textContent:"Cancel"}
    }, footerLeft);
    const footerRight=DOM.create("div", {
      props:{className:"right"}
    }, this.footer);
    DOM.create("w-button", {
      attrs:{type:"outline", size:"sm"},
      props:{className:"secondary", textContent:"Cancel"}
    }, footerRight);
    DOM.create("w-button", {
      attrs:{size:"sm"},
      props:{className:"main", textContent:"OK"}
    }, footerRight);
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