import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  div.list{
    border:1px solid var(--color-gray-20);
    border-radius:4px;
    margin:1rem 0px;
  }
  div.list>::slotted([slot='item']){
    padding:0.5rem;
    border-bottom:1px solid var(--color-gray-20);
  }
  div.list>::slotted([slot='item']:last-child){
    border-bottom-width:0px;
  }
`;
class List extends WComponent{
  static defaultValues={
    mark:"none"
  };
  constructor(){
    super();
  }
  render(){
    const mark=AttributeParser.parseStringAttr(
      this.getAttribute("mark"),
      this.getDefaultValueByName("mark"),
      /none|circle|number/
    );
    const attrs={};
    for(let i=0;i<this.attributes.length;i++){
      attrs[this.attributes[i].name]=this.attributes[i].value;
    }
    const list=DOM.create("div", {props:{className:"list"}, attrs:attrs}, this.shadowRoot);
    DOM.create("slot", {props:{name:"item"}}, list);
    const items=this.querySelectorAll("[slot='item']");
    items.forEach((item, index)=>{
      let markChar="";
      switch(mark){
        case "circle":
          markChar=this.getCircleChar();
          break;
        case "number":
          markChar=this.getNumberChar(index);
          break;
      }
      item.textContent=markChar+item.textContent;
    });
  }
  getCircleChar(){
    return "● ";
  }
  getNumberChar(index){
    return (index+1)+". ";
  }
}
List.prototype.stylesheet=stylesheet;
export default List;