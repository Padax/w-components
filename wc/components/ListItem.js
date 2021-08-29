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
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  render(){
    // render
    const mark=this.parentElement.mark?this.parentElement.mark:"";
    const markedItem=DOM.create("div", {props:{className:"item"}, attrs:{mark, disabled: this.disabled}}, this.shadowRoot);
    if(mark==="number"){
      // calculate index
      const itemTagName=window.prefix+"-li";
      let element=this;
      let index=0;
      while((element=element.previousSibling)!=null){
        if(typeof element.tagName==="string" && element.tagName.toLowerCase()===itemTagName){
          index++;
        }
      }
      DOM.create("div", {props:{className:"mark", textContent:(index+1)+"."}}, markedItem);
    }else{
      DOM.create("div", {props:{className:"mark"}}, markedItem);
    }
    DOM.create("slot", {}, markedItem);
  }
}
ListItem.prototype.stylesheet=stylesheet;
export default ListItem;