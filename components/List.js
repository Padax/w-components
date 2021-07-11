import DOM from "./util/DOM.js";
const stylesheet=`
  :host{
    
  }
`;
class List extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    DOM.create("style", {props:{textContent:stylesheet}}, this.shadowRoot);
    const props={
      href:this.getAttribute("href"),
      textContent:this.textContent
    };
    if(this.getAttribute("target")!==null){
      props.target=this.getAttribute("target");
    }
    DOM.create("a", {props:props}, this.shadowRoot);
  }
}
export default List;