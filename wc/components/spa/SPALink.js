import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
class SPALink extends WComponent{
  static defaultValues={
    href:""
  };
  constructor(){
    super();
  }
  componentWillRender(){
    this.href=AttributeParser.parseStringAttr(
      this.getAttribute("href"),
      this.getDefaultValueByName("href"),
      /.*/
    );
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