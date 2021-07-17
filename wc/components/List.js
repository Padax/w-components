import WCComponent, { DOM, PropParser } from "../WCComponent.js";
const stylesheet=`
  :host>div.list{
    border:1px solid var(--color-gray-20);
    border-radius:4px;
    margin:1rem 0px;
  }
  :host>div.list>.item{
    padding:0.5rem;
    border-bottom:1px solid var(--color-gray-20);
  }
  :host>div.list>.item:last-child{
    border-bottom-width:0px;
  }
`;
class List extends WCComponent{
  static defaultValues={
    mark:"none"
  };
  constructor(){
    super(stylesheet);
  }
  render(){
    const attrs={};
    for(let i=0;i<this.attributes.length;i++){
      attrs[this.attributes[i].name]=this.attributes[i].value;
    }
    const list=DOM.create("div", {props:{className:"list"}, attrs:attrs}, this.shadowRoot);
    // append all child nodes to basic components
    const mark=PropParser.parseStringProp(
      this.getAttribute("mark"),
      this.getDefaultValueByName("mark"),
      /none|circle|number/
    );
    const items=this.querySelectorAll(".item");
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
      item.textContent=markChar+" "+item.textContent;
      list.appendChild(item);
    });
  }
  getCircleChar(){
    return "●";
  }
  getNumberChar(index){
    return (index+1)+".";
  }
}
export default List;