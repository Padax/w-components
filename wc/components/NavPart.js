import WComponent, { DOM } from "../WComponent.js";
const stylesheet=`
  :host{
    display:flex;align-items:center;
  }
`;
class NavPart extends WComponent{
  constructor(){
    super();
  }
  render(){
    DOM.create("slot", {}, this.shadowRoot);
  }
}
NavPart.prototype.stylesheet=stylesheet;
export default NavPart;