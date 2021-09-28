import WComponent, { DOM, AttributeParser } from "../../WComponent.js";
const stylesheet=`
  :host{
    display:contents;
  }
  .wrapper{
    flex:none;display:flex;align-items:center;
  }
  .wrapper[width='auto']{
    flex:auto;
  }
  .wrapper>::slotted(*){
    display:flex;justify-content:center;align-items:center;
    padding:0px 10px;margin:0px 10px;
  }
  .wrapper>slot{
    flex:auto;display:flex;align-items:center;
  }
  .wrapper>slot + .trigger{
    flex:auto;display:none;align-items:center;
  }
  .wrapper>slot + .trigger:before{
    font-family:var(--icon-font-regular);
    font-size:1.5rem;
    content:'\\f4e1'
  }
  .wrapper>slot[arrange='left'],
  .wrapper>slot[arrange='left'] + .trigger{
    justify-content:flex-start;
  }
  .wrapper>slot[arrange='right'],
  .wrapper>slot[arrange='right'] + .trigger{
    justify-content:flex-end;
  }
  .wrapper>slot[arrange='center'],
  .wrapper>slot[arrange='center'] + .trigger{
    justify-content:center;
  }
  .wrapper>.mask{
    display:none;
    position:fixed;
    top:0px;left:0px;
    width:100%;height:100%;
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
        value, attr.defaultValue, /^none$|^iconify$|^slide$|^hide$/
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
        .wrapper{
          overflow-x:auto;
        }
        .wrapper>slot[rwd='iconify-${rwdSize}']::slotted(*){
          padding:10px;margin:10px;
        }
        .wrapper>slot[rwd='iconify-${rwdSize}']{
          display:none;
          text-align:center;line-height:2rem;padding:10px 0px;padding-top:30px;
          z-index:101;
          position:fixed;top:0px;right:0px;min-width:250px;height:100%;
          background-color:#ffffff;box-shadow:0px 0px 5px #888888;
        }
        .wrapper>slot[rwd='iconify-${rwdSize}'].show, .wrapper>.show{
          display:block;
        }
        .wrapper>slot[rwd^='iconify-${rwdSize}'] + .trigger{
          display:flex;
        }
        .wrapper>slot[rwd='hide-${rwdSize}']{
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
    const wrapper=DOM.create("div", {
      attrs:{width: this.width},
      props:{className:"wrapper"}
    }, this.shadowRoot);
    const root=DOM.create("slot", {attrs:{
      arrange: this.arrange, rwd:this["rwd-effect"]+"-"+rwdSize
    }}, wrapper);
    const toggle=()=>{
      root.classList.toggle("show");
      mask.classList.toggle("show");
    };
    DOM.create("div", {props:{
      className:"trigger"
    }, events:{
      click:toggle
    }}, wrapper);
    const mask=DOM.create("div", {props:{
      className:"mask"
    }, events:{
      click:toggle
    }}, wrapper);
  }
}
NavPart.prototype.stylesheet=stylesheet;
export default NavPart;