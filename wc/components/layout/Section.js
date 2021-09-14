import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;
    justify-content:center;
    padding:50px 0px;
  }
`;
class Section extends WComponent{
  static attributes = {
    width: {
      name: 'width', defaultValue: 1200,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 0, 10000
      )
    },
    cols: {
      name: 'cols', defaultValue: 1,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 1, 8
      )
    },
    colgap: {
      name: 'colgap', defaultValue: 15,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 0, 100
      )
    },
    rowgap: {
      name: 'rowgap', defaultValue: 15,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 0, 100
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
    const grid=DOM.create(`${window.wconfig.prefix}-grid`, {attrs:{
      cols:this.cols, colgap:this.colgap, rowgap:this.rowgap
    }, styles:{
      width:`${this.width}px`, maxWidth:"100%"
    }}, this.shadowRoot);
    DOM.create("slot", {}, grid);
  }
}
Section.prototype.stylesheet=stylesheet;
export default Section;