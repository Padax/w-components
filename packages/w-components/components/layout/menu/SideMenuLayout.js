import WComponent, { DOM, AttributeParser, getWTagName } from "../../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;
  }
  :host>::slotted(w-sidemenu){
    flex:none;order:1;
    width:150px;height:calc(100vh - 100px);position:sticky;top:80px;
    left:0px;right:auto;
    padding:10px 15px;border-left:none;border-right:1px solid #cccccc;
  }
  :host([position='right'])>::slotted(w-sidemenu){
    order:2;
    left:auto;right:0px;
    border-left:1px solid #cccccc;border-right:none;
  }
  :host>::slotted(w-sidemenu-content){
    order:2;
    flex:auto;padding:15px 20px;
  }
  :host([position='right'])>::slotted(w-sidemenu-content){
    order:1;
  }
`;
class SideMenuLayout extends WComponent{
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
SideMenuLayout.prototype.stylesheet=stylesheet;
export default SideMenuLayout;