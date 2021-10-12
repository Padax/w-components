import WComponent, { DOM, AttributeParser } from "../../../WComponent.js";
const stylesheet=`
  :host{
    display:flex;flex:auto;align-items:center;
  }
  :host([width='fit']){
    flex:none;
  }
  :host>::slotted(:not(w-nav-part)){
    display:flex;justify-content:center;align-items:center;
    padding:0px 10px;margin:0px 10px;
  }
  :host>.trigger{
    flex:auto;display:none;align-items:center;
    padding:0px 10px;margin:0px 10px;
  }
  :host>.trigger:before{
    font-family:var(--icon-font-regular);
    font-size:1.5rem;
    content:'\\f4e1'
  }
  :host([arrange='left']),
  :host([arrange='left'])>.trigger{
    justify-content:flex-start;
  }
  :host([arrange='right']),
  :host([arrange='right'])>.trigger{
    justify-content:flex-end;
  }
  :host([arrange='center']),
  :host(slot[arrange='center'])>.trigger{
    justify-content:center;
  }
  :host>.mask{
    display:none;
    position:fixed;
    top:0px;left:0px;
    width:100%;height:100vh;
    background-color:rgba(0,0,0,0.3);
    z-index:100;
  }
`;
class NavPart extends WComponent{
  static attributes = {
    width: {
      name: 'width', defaultValue: 'auto',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^auto$|^fit$/
      )
    },
    arrange: {
      name: 'arrange', defaultValue: 'left', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^left$|^center$|^right$/
      )
    },
    'rwd-effect': {
      name: 'rwd-effect', defaultValue: 'none', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^none$|^iconify$|^hide$/
      )
    },
    'rwd-size': {
      name: 'rwd-size', defaultValue: 'none', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^none$|^mobile$|^tablet$|^[0-9]*$/
      )
    }
  };
  static get observedAttributes() {
    return this.getObservedAttributes(this.attributes);
  }

  constructor(){
    super();
  }
  setMediaStylesheet(rwdSize){
    this.setStylesheet(`
      @media (max-width:${rwdSize}px){
        :host([rwd-effect='iconify'])>::slotted(w-nav-part){
          padding:20px 0px;
          display:grid;
          grid-template-columns:1fr;
          row-gap:10px;
        }
        :host([rwd-effect='iconify'])>slot{
          display:none;
          text-align:center;
          line-height:3rem;
          padding:10px 0px;
          z-index:101;
          position:fixed;top:0px;right:0px;min-width:250px;height:100vh;
          background-color:#ffffff;box-shadow:0px 0px 5px #888888;
        }
        :host([rwd-effect='iconify'])>.show{
          display:block;
        }
        :host([rwd-effect='iconify'])>.trigger{
          display:flex;
        }
        :host([rwd-effect='hide']){
          display:none;
        }
      }
    `);
  }
  init(){
    let rwdSize = this["rwd-size"];
    if(this["rwd-effect"]!=="none" && rwdSize!=="none"){
      if(rwdSize==="mobile"){
        rwdSize=500;
      }else if(rwdSize==="tablet"){
        rwdSize=1024;
      }else if(!isNaN(parseInt(rwdSize))){
        rwdSize=parseInt(rwdSize);
      }
      this.setMediaStylesheet(rwdSize);
    }
    const root=DOM.create("slot", {}, this.shadowRoot);
    const toggle=()=>{
      root.classList.toggle("show");
      mask.classList.toggle("show");
    };
    DOM.create("div", {props:{
      className:"trigger"
    }, events:{
      click:toggle
    }}, this.shadowRoot);
    const mask=DOM.create("div", {props:{
      className:"mask"
    }, events:{
      click:toggle
    }}, this.shadowRoot);
  }
}
NavPart.prototype.stylesheet=stylesheet;
export default NavPart;