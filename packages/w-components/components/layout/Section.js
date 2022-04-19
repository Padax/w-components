import WComponent, { DOM, AttributeParser, getWTagName } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;
    justify-content:center;
    padding:80px 0px;
  }
`;
class Section extends WComponent{
  static attributes = {
    width: {
      name: 'width', defaultValue: '1200',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^full$|^[0-9]{1,5}$/
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
    let width=this.width;
    if(width==="full"){
      width="100%";
    }else{
      width+="px";
    }
    const grid=DOM.create(getWTagName('grid'), {attrs:{
      cols:this.cols, colgap:this.colgap, rowgap:this.rowgap
    }, styles:{
      width:"100%", maxWidth:width
    }}, this.shadowRoot);
    DOM.create("slot", {}, grid);
  }
}
Section.prototype.stylesheet=stylesheet;
export default Section;