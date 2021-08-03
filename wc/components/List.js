import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  :host{
    counter-reset:number;
  }
  div.list{
    margin:1rem 0px;
  }
  div.list[appearance$='panel']{
    border:1px solid var(--color-gray-20);
    border-radius:4px;
  }
  div.list>::slotted([slot='item']){
    display:flex;align-items:center;
    padding:0.5rem;
  }
  div.list[appearance='divided-panel']>::slotted([slot='item']){
    border-bottom:1px solid var(--color-gray-20);
  }
  div.list>::slotted([slot='item']:hover){
    background-color:var(--color-gray-10);
  }
  div.list>::slotted([slot='item']:active){
    background-color:var(--color-gray-20);
  }
  div.list>::slotted([slot='item']:last-child){
    border-bottom-width:0px;
  }
  div.list[mark='circle']>::slotted([slot='item']):before{
    content:'\\fd2c';
    font-family:var(--icon-font-filled);
  }
  div.list[mark='outline-circle']>::slotted([slot='item']):before{
    content:'\\fd23';
    font-family:var(--icon-font-regular);
  }
  div.list[mark='number']>::slotted([slot='item']):before{
    counter-increment:number;
    content:counter(number) '.';
    margin-left:2px;
    margin-right:5px;
  }
`;
class List extends WComponent{
  static defaultValues={
    mark:"none",
    appearance:"normal"
  };
  constructor(){
    super();
  }
  render(){
    const mark=AttributeParser.parseStringAttr(
      this.getAttribute("mark"),
      this.getDefaultValueByName("mark"),
      /^none$|^circle$|^outline-circle$|^number$/
    );
    const appearance=AttributeParser.parseStringAttr(
      this.getAttribute("appearance"),
      this.getDefaultValueByName("appearance"),
      /^normal$|^panel$|^divided-panel$/
    );
    const attrs={
      mark, appearance
    };
    const list=DOM.create("div", {props:{className:"list"}, attrs:attrs}, this.shadowRoot);
    DOM.create("slot", {props:{name:"item"}}, list);
  }
}
List.prototype.stylesheet=stylesheet;
export default List;