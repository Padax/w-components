import WComponent, { DOM, AttributeParser } from "../WComponent.js";
import ListItem from "./ListItem.js";
const stylesheet=`
  :host {
    display: block;
  }
  div.list{
    margin:1rem 0px;
  }
  div.list[appearance$='panel']{
    border:1px solid var(--color-gray-20);
    border-radius:4px;
  }
  div.list>::slotted(*){
    display:flex;align-items:center;
    padding:0.5rem;
  }
  div.list[appearance='divided-panel']>::slotted(*){
    border-bottom:1px solid var(--color-gray-20);
  }
  div.list[appearance$='panel']>::slotted(*:hover){
    background-color:var(--color-gray-10);
  }
  div.list[appearance$='panel']>::slotted(*:active){
    background-color:var(--color-gray-20);
  }
  div.list>::slotted(*[disabled]){
    pointer-events:none;
    color:var(--color-gray-40);
  }
  div.list>::slotted(*[disabled]:hover),
  div.list>::slotted(*[disabled]:active){
    background-color:initial;
  }
  div.list>::slotted(*:last-child){
    border-bottom-width:0px;
  }
`;
class List extends WComponent{
  static title = 'List';
  static tagName = 'list';
  static description = 'General styled list component.';
  static attributes = {
    mark: { 
      name: 'mark', defaultValue: 'none',
      possibleValues: 'none|circle|outline-circle|number',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^none$|^circle$|^outline-circle$|^number$/
      )
    },
    appearance: {
      name: 'appearance', defaultValue: 'normal',
      possibleValues: 'normal|panel|divided-panel',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^normal$|^panel$|^divided-panel$/
      )
    }
  };
  static methods = null;
  static childComponents = new Map([['ListItem', ListItem]]);
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  
  constructor(){
    super();
  }
  init(){
    window.customElements.upgrade(this);
    for(let i=0;i<this.children.length;i++){
      this.children[i].updateMark(this.mark, i);
    }
    this.list=DOM.create("div", {props:{className:"list"}, attrs:{appearance: this.appearance}}, this.shadowRoot);
    DOM.create("slot", {}, this.list);
  }
  update(args){
    switch(args.name){
      case 'mark':
        for(let i=0;i<this.children.length;i++){
          this.children[i].updateMark(this.mark, i);
        }
        break;
      case 'appearance':
        DOM.modify(this.list, {attrs:{appearance: args.newValue}});
        break;
    }
  }
}
List.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(List);

export default List;