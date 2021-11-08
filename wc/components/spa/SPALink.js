import WComponent, { DOM, AttributeParser, getWTagName } from "../../WComponent.js";
class SPALink extends WComponent{
  static attributes = {
    href: {
      name: 'href', defaultValue: '',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor(){
    super();
  }
  init(){
    DOM.create("slot", {events:{
      click:()=>{
        this.changePage()
      }
    }}, this.shadowRoot);
  }
  changePage(){
    const href=window.wconfig.spa.basename+this.href;
    window.history.pushState({}, href, href);
    const pages=document.querySelectorAll(getWTagName('spa-page'));
    pages.forEach((page)=>{
      page.setCurrent(page.match(href));
    });
  }
}
export default SPALink;