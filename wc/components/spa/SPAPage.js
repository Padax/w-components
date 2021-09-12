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
  static attributes = {
    path: {
      name: 'path', defaultValue: '',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
      )
    },
    current: {
      name: 'current', defaultValue: false,
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor(){
    super();
    window.addEventListener("popstate", (e)=>{
      this.setCurrent(this.match(window.location.pathname));
    });
  }
  /*
  componentWillRender(){
    this.current=this.match(window.location.pathname);
    this.events={
      init:new Event("init"),
      dispose:new Event("dispose")
    };
  }
  */
  match(path){
    return path.startsWith(this.path);
  }
  setCurrent(current){
    if(this.current===current){
      return;
    }
    this.current=current;
    this.init();
  }
  init(){
    const props={
      className:this.current?"show":"hide"
    };
    if(this.current){ // if shown, take content outside of template
      const template=this.querySelector("template");
      if(template!==null){
        this.appendChild(template.content.cloneNode(true));
        template.remove();
      }
    }
    if(this.root){
      DOM.modify(this.root, {props: props});
    }else{
      this.root=DOM.create("slot", {props: props}, this.shadowRoot);
    }
    if(this.current){
      this.dispatchEvent(this.events.init);
    }else{
      this.dispatchEvent(this.events.dispose);
    }
  }
}
SPAPage.prototype.stylesheet=stylesheet;
export default SPAPage;