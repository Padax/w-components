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
  :host>.circle:before{
    content:'\\fd2c';
    font-family:var(--icon-font-filled);
    margin-right:8px;
  }
  :host>.outline-circle:before{
    content:'\\fd23';
    font-family:var(--icon-font-regular);
    margin-right:8px;
  }
  :host>.number{
    margin-left:4px;
    margin-right:8px;
  }
`;
class ListItem extends WComponent{
  static title = 'List Item';
  static tagName = 'li';
  static description = 'General styled list item component, should be wrapped by list component.';
  static attributes = {
    disabled: {
      name: 'disabled', defaultValue: false,
      possibleValues: 'true|false',
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static methods = null;
  static childComponents = null;
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  init(){
    DOM.create("div", {props:{className:"mark"}}, this.shadowRoot);
    DOM.create("slot", {}, this.shadowRoot);
  }
  // update from self-observing attributes
  update(args){
    const attrs={removes:[]};
    if(this.disabled){
      attrs["disabled"]=true;
    }else{
      attrs.removes.push("disabled");
    }
    DOM.modify(this, {attrs});
  }
  // update from parent element
  updateMark(mark, index){
    if(mark==="number"){
      DOM.modify(this.shadowRoot.querySelector(".mark"), {props:{textContent:(index+1)+".", className:"mark "+mark}});
    }else{
      DOM.modify(this.shadowRoot.querySelector(".mark"), {props:{textContent:"", className:"mark "+mark}});
    }
  }
}
ListItem.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(ListItem);

export default ListItem;