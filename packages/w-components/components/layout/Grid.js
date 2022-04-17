import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=``;
class Grid extends WComponent{
  static tagName = 'grid';
  static attributes = {
    cols: {
      name: 'cols', defaultValue: 1,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 1, 10000
      )
    },
    rows: {
      name: 'rows', defaultValue: 0,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 0, 10000
      )
    },
    colgap: {
      name: 'colgap', defaultValue: 0,
      parser: (value, attr) => AttributeParser.parseIntAttr(
          value, attr.defaultValue, 0, 100
      )
    },
    rowgap: {
      name: 'rowgap', defaultValue: 0,
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
  setGridStylesheet(cols, rows, colgap, rowgap){
    const grid={};
    // desktop
    grid.desktop=this.generateGridTemplate(cols, rows);
    // tablet
    if(cols>3){
      const tabletCols=Math.floor(cols/2)>2?Math.floor(cols/2):2;
      const tabletRows=Math.round(rows*(cols/tabletCols));
      grid.tablet=this.generateGridTemplate(tabletCols, tabletRows);
    }else{
      grid.tablet=this.generateGridTemplate(cols, rows);
    }
    // mobile
    if(cols>1){
      const tabletCols=Math.floor(cols/4)>1?Math.floor(cols/4):1;
      const tabletRows=Math.round(rows*(cols/tabletCols));
      grid.mobile=this.generateGridTemplate(tabletCols, tabletRows);
    }else{
      grid.mobile=this.generateGridTemplate(cols, rows);
    }
    this.setStylesheet(`
      .container{
        display:grid;
        grid-template-columns:${grid.desktop.cols};
        grid-template-rows:${grid.desktop.rows};
        column-gap:${colgap}px;row-gap:${rowgap}px;
      }
      @media (max-width:1024px){
        .container{
          grid-template-columns:${grid.tablet.cols};
          grid-template-rows:${grid.tablet.rows};
        }
      }
      @media (max-width:500px){
        .container{
          grid-template-columns:${grid.mobile.cols};
          grid-template-rows:${grid.mobile.rows};
        }
      }
    `, "grid");
  }
  generateGridTemplate(cols, rows){
    let templateCols=[];
    for(let i=0;i<cols;i++){
      templateCols.push("1fr");
    }
    templateCols=templateCols.join(" ");
    let templateRows="none";
    if(rows>0){
      templateRows=[];
      for(let i=0;i<rows;i++){
        templateRows.push("1fr");
      }
      templateRows=templateRows.join(" ");
    }
    return {cols:templateCols, rows:templateRows};
  }
  init(){
    this.setGridStylesheet(this.cols, this.rows, this.colgap, this.rowgap);
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