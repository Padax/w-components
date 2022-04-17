import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  :host{
    display:block;
  }
  :host([disabled])>::slotted(*){
    color:var(--color-gray-40) !important;
  }
  :host>.mark{
    display:inline-flex;align-items:center;
  }
  :host([mark='circle'])>.mark:before{
    content:'\\fd2c';
    font-family:var(--icon-font-filled);
    margin-right:8px;
  }
  :host([mark='outline-circle'])>.mark:before{
    content:'\\fd23';
    font-family:var(--icon-font-regular);
    margin-right:8px;
  }
  :host([mark='number'])>.mark{
    margin-left:4px;
    margin-right:8px;
  }
`;
class ListItem extends WComponent{
  static tagName = 'list-item';
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
    if(mark==="number"){
      const index=parseInt(this.getAttribute("index"));
      DOM.create("div", {props:{className:"mark", textContent:(index+1)+"."}}, this.shadowRoot);
    }else{
      DOM.create("div", {props:{className:"mark"}}, this.shadowRoot);
    }
    DOM.create("slot", {}, this.shadowRoot);
  }
  update(args){
    /* has implemented in WComponent update method
    if(args.oldValue===args.newValue){
      return;
    }
    */
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
    if(mark==="number"){
      const index=parseInt(this.getAttribute("index"));
      DOM.modify(this.shadowRoot.querySelector(".mark"), {props:{textContent:(index+1)+"."}});
    }else{
      DOM.modify(this.shadowRoot.querySelector(".mark"), {props:{textContent:""}});
    }
  }
}
ListItem.prototype.stylesheet=stylesheet;
export default ListItem;