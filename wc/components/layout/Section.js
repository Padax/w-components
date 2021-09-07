import WComponent, { DOM } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;
    justify-content:center;
  }
`;
class Section extends WComponent{
  constructor(){
    super();
  }
  render(){
    const grid=DOM.create(`${window.prefix}-grid`, {attrs:{
      columns:3, rows:2
    }, styles:{
      width:"1200px", maxWidth:"100%"
    }}, this.shadowRoot);
    DOM.create("slot", {}, grid);
  }
}
Section.prototype.stylesheet=stylesheet;
export default Section;