import WComponent, { DOM, AttributeParser } from "../WComponent.js";
const stylesheet=`
  :host {
    display:flex;
    align-items:center;
  }
  :host>.cursor{
    display:inline-block;
    width:1px;height:1.2em;
    background-color:var(--color-gray-90)
  }
  :host>.hide{
    visibility:hidden;
  }
`;
class TypeWriter extends WComponent{
  static attributes = {
    speed: {
      name: 'speed', defaultValue: 5, min: 1, max: 10,
      parser: (value, attr) => AttributeParser.parseIntAttr(
        value, attr.defaultValue, attr.min, attr.max
      )
    },
    delay: {
      name: 'delay', defaultValue: 0, min: 0, max: 1000000,
      parser: (value, attr) => AttributeParser.parseIntAttr(
        value, attr.defaultValue, attr.min, attr.max
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
    this.circleTime=this.speed*20;
    this.effect={
      content:this.textContent,
      frameIndex:0,
      frames:new Array(Math.floor(this.delay/this.circleTime)).fill(-1) // record display length in every time frame
    };
    this.effect.frames.push(0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    for(let i=2;i<=this.effect.content.length;i++){
      this.effect.frames.push(i);
    }
    this.text=DOM.create("span", {props:{
      className:"text"
    }}, this.shadowRoot);
    this.cursor=DOM.create("span", {props:{
      className:"cursor hide"
    }}, this.shadowRoot);
    this.start();
  }
  start(){
    this.effectId=window.setInterval(this.refresh.bind(this), this.circleTime);
  }
  refresh(){
    if(this.effect.frames[this.effect.frameIndex]!==-1){
      DOM.modify(this.cursor, {props:{className:"cursor"+(Math.floor(this.effect.frameIndex/5)%2===0?"":" hide")}});
      if(this.effect.frameIndex<this.effect.frames.length){
        DOM.modify(this.text, {props:{textContent:this.effect.content.substring(0, this.effect.frames[this.effect.frameIndex])}});
      }
    }
    this.effect.frameIndex++;
    if(this.effect.frameIndex>this.effect.frames.length+10){
      DOM.modify(this.cursor, {props:{className:"cursor hide"}});
      window.clearInterval(this.effectId);
    }
  }
}
TypeWriter.prototype.stylesheet=stylesheet;
export default TypeWriter;