import DOM from "./util/DOM.js";
const stylesheet=`
  a{
    color:#222222;text-decoration:none;
  }
  a:hover, a:active{
    color:#0077cc;
  }
`;
class Link extends HTMLElement{
  constructor(){
    super();
    const shadowRoot=this.attachShadow({mode:"closed"});
    DOM.create("style", {props:{textContent:stylesheet}}, shadowRoot);
    const attrs={};
    for(let i=0;i<this.attributes.length;i++){
      attrs[this.attributes[i].name]=this.attributes[i].value;
    }
    const anchor=DOM.create("a", {attrs:attrs}, shadowRoot);
    // append all child nodes to basic components
    this.childNodes.forEach((node)=>{
      anchor.appendChild(node);
    });
  }
}
export default Link;