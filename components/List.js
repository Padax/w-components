import DOM from "./util/DOM.js";
const stylesheet=`
  :host{
    
  }
`;
class List extends HTMLElement{
  constructor(){
    super();
    const shadowRoot=this.attachShadow({mode:"closed"});
    DOM.create("style", {props:{textContent:stylesheet}}, shadowRoot);
    const props={
      href:this.getAttribute("href"),
      textContent:this.textContent
    };
    if(this.getAttribute("target")!==null){
      props.target=this.getAttribute("target");
    }
    DOM.create("a", {props:props}, shadowRoot);
  }
}
export default List;