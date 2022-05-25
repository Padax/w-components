import WComponent, { DOM, AttributeParser, getWTagName } from "../../../WComponent.js";
const stylesheet=`
  :host{}
`;
class SideMenu extends WComponent{
  static attributes = {
    position: {
      name: 'position', defaultValue: 'left',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^left$|^right$/
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
    DOM.create("slot", {}, this.shadowRoot);
  }
}
SideMenu.prototype.stylesheet=stylesheet;
export default SideMenu;