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
    delay: {
      name: 'delay', defaultValue: 0, min: 0, max: 1000,
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
    this.circleTime=100;
    this.effect={
      content:this.textContent,
      frameIndex:0,
      frames:new Array(Math.floor((this.delay*1000)/this.circleTime)).fill(-1) // record display length in every time frame
    };
    console.log(this.effect.frames.length);
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
    this.effectId=window.setInterval(this.refresh.bind(this), 100);
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