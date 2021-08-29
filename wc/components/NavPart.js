import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  .wrapper{
    display:flex;align-items:center;
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
        :host{
          overflow-x:auto;
        }
        .wrapper>slot[rwd='iconify-${rwdSize}']{
          display:none;
          text-align:center;line-height:2rem;padding:10px 0px;
          z-index:101;
          position:fixed;top:0px;right:0px;min-width:150px;height:100%;
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
  render(){
    let rwdPixel = this.rwdSize;
    if(rwdPixel!=="none"){
      if(rwdPixel==="mobile"){
        rwdPixel=500;
      }else if(rwdPixel==="tablet"){
        rwdPixel=1024;
      }else if(!isNaN(parseInt(rwdPixel))){
        rwdPixel=parseInt(rwdPixel);
      }
      this.setMediaStylesheet(rwdPixel);
    }
    const wrapper=DOM.create("div", {props:{className:"wrapper"}}, this.shadowRoot);
    const root=DOM.create("slot", {attrs:{
      arrange: this.arrange, rwd:this.rwdEffect+"-"+this.rwdPixel
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