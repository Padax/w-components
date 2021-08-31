import WComponent, { DOM } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;align-items:center;
    padding:15px;
    position:sticky;top:0px;left:0px;
    background-color:#ffffff;
  }
`;
class Nav extends WComponent{
  constructor(){
    super();
  }
  render(){
    const root=DOM.create("slot", {}, this.shadowRoot);
  }
}
Nav.prototype.stylesheet=stylesheet;
export default Nav;