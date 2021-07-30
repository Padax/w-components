import WComponent, { DOM } from "../WComponent.js";
const stylesheet=`
  :host{
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
    DOM.create("style", {props:{textContent:stylesheet}}, this.shadowRoot);
    DOM.create("slot", {props:{
      name:"left"
    }}, this.shadowRoot);
    DOM.create("slot", {props:{
      name:"center"
    }}, this.shadowRoot);
    DOM.create("slot", {props:{
      name:"right"
    }}, this.shadowRoot);
  }
}
Nav.prototype.stylesheet=stylesheet;
export default Nav;