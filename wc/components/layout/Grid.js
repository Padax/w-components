import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=``;
class Grid extends WComponent{
  static attributes = {
    columns: {
      name: 'columns', defaultValue: 1,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 1, 10000
      )
    },
    rows: {
      name: 'rows', defaultValue: 1,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 1, 10000
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }
  constructor(){
    super();
  }
  setGridStylesheet(columns, rows){
    let gridColumns=[];
    for(let i=0;i<columns;i++){
      gridColumns.push("1fr");
    }
    let gridRows=[];
    for(let i=0;i<rows;i++){
      gridRows.push("1fr");
    }
    this.setStylesheet(`
      .container{
        display:grid;
        grid-template-columns:${gridColumns.join(" ")};
        grid-template-rows:${gridRows.join(" ")};
      }
    `, "grid");
  }
  init(){
    this.setGridStylesheet(this.columns, this.rows);
    if(!this.container){
      this.container=DOM.create("div", {props:{className:"container"}}, this.shadowRoot);
      DOM.create("slot", {}, this.container);
    }
  }
  attributeChangedCallback(name, oldValue, newValue){
    this.init();
  }
}
Grid.prototype.stylesheet=stylesheet;
export default Grid;