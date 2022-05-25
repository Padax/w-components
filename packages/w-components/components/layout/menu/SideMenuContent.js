import WComponent, { DOM, AttributeParser, getWTagName } from "../../../WComponent.js";
const stylesheet=`
  :host{}
`;
class SideMenuContent extends WComponent{
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
export default SideMenuContent;