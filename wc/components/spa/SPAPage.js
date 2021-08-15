import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  slot.hide{
    display:none;
  }
  slot.show{
    display:block;
  }
`;
class SPAPage extends WComponent{
  static defaultValues={
    path:"",
    current:false
  };
  constructor(){
    super();
    window.addEventListener("popstate", (e)=>{
      this.setCurrent(this.match(window.location.pathname));
    });
  }
  componentWillRender(){
    this.path=AttributeParser.parseStringAttr(
      this.getAttribute("path"),
      this.getDefaultValueByName("path"),
      /.*/
    );
    this.current=this.match(window.location.pathname);
  }
  match(path){
    return path.startsWith(this.path);
  }
  setCurrent(current){
    this.current=current;
    this.render();
  }
  render(){
    const props={
      className:this.current?"show":"hide"
    };
    if(this.root){
      DOM.modify(this.root, {props: props});
    }else{
      this.root=DOM.create("slot", {props: props}, this.shadowRoot);
    }
  }
}
SPAPage.prototype.stylesheet=stylesheet;
export default SPAPage;