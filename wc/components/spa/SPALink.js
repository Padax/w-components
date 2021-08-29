import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
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
  render(){
    DOM.create("slot", {events:{
      click:()=>{
        this.changePage()
      }
    }}, this.shadowRoot);
  }
  changePage(){
    window.history.pushState({}, this.href, this.href);
    const pages=document.querySelectorAll("w-spa-page");
    pages.forEach((page)=>{
      page.setCurrent(page.match(this.href));
    });
  }
}
export default SPALink;