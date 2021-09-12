import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;
    justify-content:center;
  }
`;
class Section extends WComponent{
  static attributes = {
    width: {
      name: 'width', defaultValue: 1200,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 0, 10000
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
    const grid=DOM.create(`${window.prefix}-grid`, {attrs:{
      columns:3, rows:2
    }, styles:{
      width:`${this.width}px`, maxWidth:"100%"
    }}, this.shadowRoot);
    DOM.create("slot", {}, grid);
  }
}
Section.prototype.stylesheet=stylesheet;
export default Section;