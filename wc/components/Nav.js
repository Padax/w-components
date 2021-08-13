import WComponent, { DOM } from "../WComponent.js";
import sharedStylesheet from "../theme/light.js";
const stylesheet=`
  :host{
    display:flex;align-items:center;
    padding:15px;
    position:sticky;top:0px;left:0px;
    background-color:#ffffff;
  }
  .wrapper{
    flex:auto;
  }
  .wrapper>[arrange='left'],
  .wrapper>[arrange='left'] + .trigger{
    justify-content:flex-start;
  }
  .wrapper>[arrange='right'],
  .wrapper>[arrange='right'] + .trigger{
    justify-content:flex-end;
  }
  .wrapper>[arrange='center'],
  .wrapper>[arrange='center'] + .trigger{
    justify-content:center;
  }
  .wrapper>.trigger{
    display:none;
  }
  .wrapper>.trigger:before{
    font-family:var(--icon-font-regular);
    font-size:1.5rem;
    content:'\\f4e1'
  }
  .wrapper>.mask{
    display:none;
    position:fixed;
    top:0px;left:0px;
    width:100%;height:100%;
    z-index:100;
  }
  @media (max-width:500px){
    .wrapper>[rwd='iconify']{
      display:none;
      text-align:center;line-height:2rem;padding:10px 0px;
      z-index:101;
      position:fixed;top:0px;right:0px;min-width:150px;height:100%;
      background-color:#ffffff;box-shadow:0px 0px 5px #888888;
    }
    .wrapper>.show{
      display:block;
    }
    .wrapper>[rwd='iconify'] + .trigger{
      display:flex;
    }
  }
`;
class Nav extends WComponent{
  constructor(){
    super();
    this.setStylesheet(sharedStylesheet);
  }
  render(){
    const parts=this.querySelectorAll(window.prefix+"-nav-part");
    parts.forEach((part)=>{
      const wrapper=DOM.create("div", {props:{className:"wrapper"}}, this.shadowRoot);
      DOM.replace(part, wrapper);
      DOM.create("div", {props:{
        className:"trigger"
      }, events:{
        click:()=>{
          part.classList.toggle("show");
          mask.classList.toggle("show");
        }
      }}, wrapper);
      const mask=DOM.create("div", {props:{
        className:"mask"
      }, events:{
        click:()=>{
          part.classList.toggle("show");
          mask.classList.toggle("show");
        }
      }}, wrapper);
    });
  }
}
Nav.prototype.stylesheet=stylesheet;
export default Nav;