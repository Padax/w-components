import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
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
  static defaultValues={
    mark:"none",
    appearance:"normal"
  };
  constructor(){
    super();
  }
  componentWillRender(){
    this.mark=AttributeParser.parseStringAttr(
      this.getAttribute("mark"),
      this.getDefaultValueByName("mark"),
      /^none$|^circle$|^outline-circle$|^number$/
    );
  }
  render(){
    const appearance=AttributeParser.parseStringAttr(
      this.getAttribute("appearance"),
      this.getDefaultValueByName("appearance"),
      /^normal$|^panel$|^divided-panel$/
    );
    const list=DOM.create("div", {props:{className:"list"}, attrs:{appearance}}, this.shadowRoot);
    DOM.create("slot", {}, list);
    /*
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
    */
  }
}
List.prototype.stylesheet=stylesheet;
export default List;