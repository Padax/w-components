import WComponent, { DOM } from "../../../WComponent.js";
const stylesheet=`
  :host{}
`;
class SideMenuContent extends WComponent{
  static tagName = 'sidemenu-content';
  static attributes = {};
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  constructor(){
    super();
  }
  init(){
    DOM.create("slot", {}, this.shadowRoot);
  }
}
SideMenuContent.prototype.stylesheet=stylesheet;

DOM.defineCustomElement(SideMenuContent);

export default SideMenuContent;