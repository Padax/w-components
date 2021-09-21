import WComponent, { DOM } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;align-items:center;
    padding:15px;
    position:sticky;top:0px;left:0px;
    background-color:transparent;
    transition:background-color 0.2s;
    z-index:100;
  }
`;
class Nav extends WComponent{
  constructor(){
    super();
  }
  init(){
    this.docTop=document.documentElement.scrollTop;
    this.docThreshold=100;
    window.addEventListener("scroll", this.scroll.bind(this));
    DOM.create("slot", {}, this.shadowRoot);
  }
  scroll(){
    console.log(this.docTop, this.docThreshold);
    if(this.docTop<=this.docThreshold){
      if(document.documentElement.scrollTop>this.docThreshold){
        this.style.backgroundColor="white";
        this.style.borderBottom="1px solid #cccccc";
      }
    }else{
      if(document.documentElement.scrollTop<=this.docThreshold){
        this.style.backgroundColor="transparent";
        this.style.borderBottom="none";
      }
    }
    this.docTop=document.documentElement.scrollTop;
  }
}
Nav.prototype.stylesheet=stylesheet;
export default Nav;