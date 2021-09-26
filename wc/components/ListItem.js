import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  :host{
    display:block;
  }
  div.item>.mark{
    display:inline-flex;align-items:center;
  }
  div.item[mark='circle']>.mark:before{
    content:'\\fd2c';
    font-family:var(--icon-font-filled);
    margin-right:8px;
  }
  div.item[mark='outline-circle']>.mark:before{
    content:'\\fd23';
    font-family:var(--icon-font-regular);
    margin-right:8px;
  }
  div.item[mark='number']>.mark{
    margin-left:4px;
    margin-right:8px;
  }
`;
class ListItem extends WComponent{
  static attributes = {
    disabled: {
      name: 'disabled', defaultValue: false,
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    },
    mark: { 
      name: 'mark', defaultValue: 'none',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^none$|^circle$|^outline-circle$|^number$/
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
    // render
    const mark=this.mark;
    this.markedItem=DOM.create("div", {props:{className:"item"}, attrs:{mark}}, this.shadowRoot);
    if(mark==="number"){
      // calculate index
      const itemTagName=window.wconfig.prefix+"-li";
      let element=this;
      let index=0;
      while((element=element.previousSibling)!=null){
        if(typeof element.tagName==="string" && element.tagName.toLowerCase()===itemTagName){
          index++;
        }
      }
      DOM.create("div", {props:{className:"mark", textContent:(index+1)+"."}}, this.markedItem);
    }else{
      DOM.create("div", {props:{className:"mark"}}, this.markedItem);
    }
    DOM.create("slot", {}, this.markedItem);
  }
  update(){
    // handle disabled
    const attrs={removes:[]};
    if(this.disabled){
      attrs["disabled"]=true;
    }else{
      attrs.removes.push("disabled");
    }
    DOM.modify(this, {attrs});
    // handle mark
    const mark=this.mark;
    DOM.modify(this.markedItem, {attrs:{mark}});
    if(mark==="number"){
      // calculate index
      const itemTagName=window.wconfig.prefix+"-li";
      let element=this;
      let index=0;
      while((element=element.previousSibling)!=null){
        if(typeof element.tagName==="string" && element.tagName.toLowerCase()===itemTagName){
          index++;
        }
      }
      DOM.modify(this.markedItem.querySelector(".mark"), {props:{textContent:(index+1)+"."}});
    }else{
      DOM.modify(this.markedItem.querySelector(".mark"), {props:{textContent:""}});
    }
  }
}
ListItem.prototype.stylesheet=stylesheet;
export default ListItem;