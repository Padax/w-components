import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  :host([current='false']){
    display:none;
  }
  :host([current='true']){
    display:block;
  }
`;
class SPAPage extends WComponent{
  static tagName = 'spa-page';
  static attributes = {
    path: {
      name: 'path', defaultValue: '',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
      )
    },
    exact: {
      name: 'exact', defaultValue: false,
      parser: (value, attr) => AttributeParser.parseBoolAttr(
        value, attr.defaultValue
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
  init(){
    // init current
    this.current=this.match(window.location.pathname);
    // first render
    this.render(true);
  }
  update(args){
    this.render();
  }
  render(init=false){
    // handle template
    if(this.current){ // if shown, take content outside of template
      const template=this.querySelector("template");
      if(template!==null){
        this.appendChild(template.content.cloneNode(true));
        template.remove();
      }
    }
    // render contents
    if(init){
      DOM.create("slot", {}, this.shadowRoot);
    }
    // fire custom event
    if(this.current){
      this.dispatchEvent(new Event('init'));
    }else{
      this.dispatchEvent(new Event('dispose'));
    }
  }
  match(path){
    if(this.exact){
      return path===BASE_NAME+this.path;
    }else{
      return path.startsWith(BASE_NAME+this.path);
    }
  }
  setCurrent(current){
    if(this.current===current){
      return;
    }
    this.current=current;
  }
}
SPAPage.prototype.stylesheet=stylesheet;

const BASE_NAME = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));

DOM.defineCustomElement(SPAPage);

export default SPAPage;