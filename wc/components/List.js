import WComponent, { DOM, AttributeParser } from "../WComponent.js";
/*
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
  div.list[appearance$='panel']>::slotted([slot='item']:hover){
    background-color:var(--color-gray-10);
  }
  div.list[appearance$='panel']>::slotted([slot='item']:active){
    background-color:var(--color-gray-20);
  }
  div.list>::slotted([slot='item']:last-child){
    border-bottom-width:0px;
  }
  div.list[mark='circle']>::slotted([slot='item']):before{
    content:'\\fd2c';
    font-family:var(--icon-font-filled);
    margin-right:8px;
  }
  div.list[mark='outline-circle']>::slotted([slot='item']):before{
    content:'\\fd23';
    font-family:var(--icon-font-regular);
    margin-right:8px;
  }
  div.list[mark='number']>::slotted([slot='item']):before{
    counter-increment:number;
    content:counter(number) '.';
    margin-left:4px;
    margin-right:8px;
  }
`;
*/
const stylesheet=`
  div.list{
    counter-reset:number;
    margin:1rem 0px;
  }
  div.list[appearance$='panel']{
    border:1px solid var(--color-gray-20);
    border-radius:4px;
  }
  div.list>.item{
    display:flex;align-items:center;
    padding:0.5rem;
  }
  div.list[appearance='divided-panel']>.item{
    border-bottom:1px solid var(--color-gray-20);
  }
  div.list[appearance$='panel']>.item:hover{
    background-color:var(--color-gray-10);
  }
  div.list[appearance$='panel']>.item:active{
    background-color:var(--color-gray-20);
  }
  div.list[appearance$='panel']>.item[disabled]{
    color:var(--color-gray-40);
  }
  div.list[appearance$='panel']>.item[disabled]:hover,
  div.list[appearance$='panel']>.item[disabled]:active{
    background-color:initial;
  }
  div.list>.item:last-child{
    border-bottom-width:0px;
  }
  div.list[mark='circle']>.item>.mark{
    display:inline-flex;align-items:center;
  }
  div.list[mark='circle']>.item>.mark:before{
    content:'\\fd2c';
    font-family:var(--icon-font-filled);
    margin-right:8px;
  }
  div.list[mark='outline-circle']>.item>.mark:before{
    content:'\\fd23';
    font-family:var(--icon-font-regular);
    margin-right:8px;
  }
  div.list[mark='number']>.item>.mark:before{
    counter-increment:number;
    content:counter(number) '.';
    margin-left:4px;
    margin-right:8px;
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
    // DOM.create("slot", {props:{name:"item"}}, list);
    const items=this.querySelectorAll(window.prefix+"-li");
    items.forEach((item)=>{
      const markedItemAttrs={};
      if(item.getAttribute("disabled")!==null){
        markedItemAttrs.disabled=true;
      }
      const markedItem=DOM.create("div", {props:{className:"item"}, attrs:markedItemAttrs}, list);
      DOM.create("div", {props:{className:"mark"}}, markedItem);
      DOM.replace(item, markedItem);
    });
  }
}
List.prototype.stylesheet=stylesheet;
export default List;