import WComponent, { DOM } from "../../WComponent.js";
const stylesheet=`
  nav{
    display:flex;align-items:center;justify-content:center;
    padding:15px;width:calc(100% - 30px);
    position:fixed;top:0px;left:0px;
    background-color:transparent;
    transition:background-color 0.2s;
    z-index:100;
    backdrop-filter:blur(5px);
  }
  nav.scroll{
    background-color:rgba(255,255,255,0.8);
    border-bottom:1px solid #cccccc;
  }
  slot{
    display:flex;align-items:center;
    width:100%;max-width:1250px;
    height:100%;
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
    this.root=DOM.create("nav", {}, this.shadowRoot);
    DOM.create("slot", {}, this.root);
  }
  scroll(){
    if(this.docTop<=this.docThreshold){
      if(document.documentElement.scrollTop>this.docThreshold){
        this.root.classList.add("scroll");
      }
    }else{
      if(document.documentElement.scrollTop<=this.docThreshold){
        this.root.classList.remove("scroll");
      }
    }
    this.docTop=document.documentElement.scrollTop;
  }
}
Nav.prototype.stylesheet=stylesheet;
export default Nav;