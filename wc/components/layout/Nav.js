import WComponent, { DOM } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;align-items:center;justify-content:center;
    padding:15px;width:calc(100% - 30px);
    position:fixed;top:0px;left:0px;
    background-color:transparent;
    transition:background-color 0.2s;
    z-index:100;
    backdrop-filter:blur(5px);
  }
  slot{
    display:flex;align-items:center;
    width:100%;max-width:1250px;
  }
`;
class Nav extends WComponent{
  constructor(){
    super();
  }
  init(){
    this.docTop=document.documentElement.scrollTop;
    this.docThreshold=0;
    window.addEventListener("scroll", this.scroll.bind(this));
    DOM.create("slot", {}, this.shadowRoot);
  }
  scroll(){
    if(this.docTop<=this.docThreshold){
      if(document.documentElement.scrollTop>this.docThreshold){
        this.style.backgroundColor="rgba(255,255,255,0.8)";
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