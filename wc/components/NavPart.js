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
  @media (max-width:500px){
    .wrapper>slot[rwd='iconify']{
      display:none;
      text-align:center;line-height:2rem;padding:10px 0px;
      z-index:101;
      position:fixed;top:0px;right:0px;min-width:150px;height:100%;
      background-color:#ffffff;box-shadow:0px 0px 5px #888888;
    }
    .wrapper>slot[rwd='iconify'] + .trigger{
      display:flex;
    }
    .wrapper>slot[rwd='iconify'].show, .wrapper>.show{
      display:block;
    }
  }
`;
class NavPart extends WComponent{
  static defaultValues={
    arrange:"left",
    rwd:"none"
  };
  constructor(){
    super();
  }
  render(){
    const arrange=AttributeParser.parseStringAttr(
      this.getAttribute("arrange"),
      this.getDefaultValueByName("arrange"),
      /^left$|^center$|^right$/
    );
    const rwd=AttributeParser.parseStringAttr(
      this.getAttribute("rwd"),
      this.getDefaultValueByName("rwd"),
      /^none$|^iconify$/
    );
    const wrapper=DOM.create("div", {props:{className:"wrapper"}}, this.shadowRoot);
    const root=DOM.create("slot", {attrs:{
      arrange, rwd
    }}, wrapper);
    DOM.create("div", {props:{
      className:"trigger"
    }, events:{
      click:()=>{
        root.classList.toggle("show");
        mask.classList.toggle("show");
      }
    }}, wrapper);
    const mask=DOM.create("div", {props:{
      className:"mask"
    }, events:{
      click:()=>{
        root.classList.toggle("show");
        mask.classList.toggle("show");
      }
    }}, wrapper);
  }
}
NavPart.prototype.stylesheet=stylesheet;
export default NavPart;