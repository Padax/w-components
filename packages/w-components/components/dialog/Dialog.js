import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  .dialog-backdrop{
    position:fixed;left:0px;top:0px;width:100%;height:100%;z-index:100000000;
    background-color:rgba(0,0,0,0.5);
  }
  .dialog-backdrop-none{
    display:none;
  }
  .dialog{
    width:600px;
    position:fixed;left:calc(50% - 300px);top:100px;
    z-index:100000001;border-radius:8px;
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
  .dialog>.footer .hide{
    display:none;
  }
  .dialog>.footer>.left{
    flex:auto;
  }
  .dialog>.footer>.right{
    flex:none;
  }
  .dialog>.footer>.right>w-button.primary{
    margin-left:16px;
  }
`;
class Dialog extends WComponent{
  
  static attributes = {
    display: {
      name: 'display', defaultValue: false, 
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
    this.backdrop=DOM.create("div", {
      events:{
        click:(e)=>{
          if(e.target.backdrop==="standard"){
            this.close();
          }
        }
      }
    });
    this.dialog=DOM.create("div", {props:{className:"dialog"}});
    // head
    this.head=DOM.create("div", {props:{className:"head"}});
    this.titleElement=DOM.create("w-heading", {
      attrs:{level:3},
      props:{className:"title", textContent:this.title}
    }, this.head);
    DOM.create("div", {
      props:{className:"close"},
      events:{
        click:this.close.bind(this)
      }
    }, this.head);
    if(this.title){
      this.dialog.appendChild(this.head);
    }
    // main
    this.main=DOM.create("slot", {}, this.dialog);
    // footer
    this.footer=DOM.create("div", {props:{
      className:"footer"
    }}, this.dialog);
    const footerLeft=DOM.create("div", {
      props:{className:"left"}
    }, this.footer);
    const footerRight=DOM.create("div", {
      props:{className:"right"}
    }, this.footer);
    // buttons
    this.btns={};
    this.btns.tertiary={
      defaultValues:{
        text:"Cancel",
        color:"primary"
      },
      element:DOM.create("w-button", {
        attrs:{type:"link", size:"m"},
        props:{className:"tertiary", textContent:"Cancel"},
        events:{
          click:async (e)=>{
            if(typeof e.target.handler==="function"){
              await e.target.handler();
            }
            this.close();
          }
        }
      }, footerLeft)
    };
    this.btns.secondary={
      defaultValues:{
        text:"Cancel",
        color:"primary"
      },
      element:DOM.create("w-button", {
        attrs:{type:"outline", size:"m"},
        props:{className:"secondary", textContent:"Cancel"},
        events:{
          click:async (e)=>{
            if(typeof e.target.handler==="function"){
              await e.target.handler();
            }
            this.close();
          }
        }
      }, footerRight)
    };
    this.btns.primary={
      defaultValues:{
        text:"OK",
        color:"primary"
      },
      element:DOM.create("w-button", {
        attrs:{size:"m"},
        props:{className:"primary", textContent:"OK"},
        events:{
          click:async (e)=>{
            if(typeof e.target.handler==="function"){
              await e.target.handler();
            }
            this.close();
          }
        }
      }, footerRight)
    };
  }
  update({ name, newValue }){
    newValue=this.parseAttributeValueByName(name, newValue);
    switch(name){
      case "display":
        if(newValue){
          this.shadowRoot.appendChild(this.dialog);
          this.shadowRoot.appendChild(this.backdrop);
        }else{
          this.dialog.remove();
          this.backdrop.remove();
        }
        break;
      case "title":
        if(newValue){
          DOM.modify(this.titleElement, {props:{
            textContent:newValue
          }});
          this.dialog.insertBefore(this.head, this.dialog.firstChild);
        }else{
          this.head.remove();
        }
        break;
    }
  }
  open(args){
    if(typeof args==="object"){
      if(args.actions){
        this.customizeButton(this.btns.primary, args.actions.primary);
        this.customizeButton(this.btns.secondary, args.actions.secondary);
        this.customizeButton(this.btns.tertiary, args.actions.tertiary);
      }
      if(args.title){
        this.title=args.title;
      }
      let backdrop="standard";
      if(args.backdrop){
        backdrop=args.backdrop;
        if(backdrop!=="standard" && backdrop!=="no-action" && backdrop!=="none"){
          backdrop="standard";
        }
      }
      DOM.modify(this.backdrop, {
        props:{
          backdrop:backdrop,
          className:"dialog-backdrop"+(backdrop==="none"?" dialog-backdrop-none":"")
        }
      });
    }
    this.display=true;
  }
  close(){
    this.display=false;
  }
  customizeButton(btn, action, defaultText){
    if(action){
      DOM.modify(btn.element, {
        attrs:{
          color:typeof action.color==="string"?action.color:btn.defaultValues.color
        },
        props:{
          handler:typeof action.handler==="function"?action.handler:null,
          textContent:typeof action.text==="string"?action.text:btn.defaultValues.text
        }
      });
      btn.element.classList.remove("hide");
    }else{
      btn.element.classList.add("hide");
    }
  }
}
Dialog.prototype.stylesheet=stylesheet;
export default Dialog;