import WComponent, { DOM, AttributeParser } from "../WComponent.js";
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
  div.list[appearance$='panel']>::slotted(*[disabled]){
    pointer-events:none;
    color:var(--color-gray-40);
  }
  div.list[appearance$='panel']>::slotted(*[disabled]:hover),
  div.list[appearance$='panel']>::slotted(*[disabled]:active){
    background-color:initial;
  }
  div.list>::slotted(*:last-child){
    border-bottom-width:0px;
  }
`;
class List extends WComponent{
  static tagName = 'list';
  static attributes = {
    mark: { 
      name: 'mark', defaultValue: 'none',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^none$|^circle$|^outline-circle$|^number$/
      )
    },
    appearance: {
      name: 'appearance', defaultValue: 'normal',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^normal$|^panel$|^divided-panel$/
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
    for(let i=0;i<this.children.length;i++){
      this.children[i].setAttribute("mark", this.mark);
      this.children[i].setAttribute("index", i);
    }
    this.list=DOM.create("div", {props:{className:"list"}, attrs:{appearance: this.appearance}}, this.shadowRoot);
    DOM.create("slot", {}, this.list);
  }
  update(args){
    switch(args.name){
      case 'mark':
        for(let i=0;i<this.children.length;i++){
          this.children[i].setAttribute("mark", args.newValue);
          this.children[i].setAttribute("index", i);
        }
        break;
      case 'appearance':
        DOM.modify(this.list, {attrs:{appearance: args.newValue}});
        break;
    }
  }
}
List.prototype.stylesheet=stylesheet;
export default List;