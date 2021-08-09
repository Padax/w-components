import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  :host{
    display:block;
  }
`;
class ListItem extends WComponent{
  constructor(){
    super();
  }
  render(){
    DOM.create("slot", {}, this.shadowRoot);
  }
}
ListItem.prototype.stylesheet=stylesheet;
export default ListItem;