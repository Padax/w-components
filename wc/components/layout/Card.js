import WComponent, { DOM, AttributeParser, getWTagName } from "../../WComponent.js";
const stylesheet=`
  .card{
    text-align:center;
  }
  .card>.icon{
    border-radius:50%;
    margin-bottom:10px;
  }
  .card>.title{
    color:var(--color-gray-90);
    margin-bottom:10px;
  }
  .card>.description{
    color:var(--color-gray-60);
  }
  /* icon-cross */
  .icon-cross{
    padding:30px 40px;padding-top:50px;
    border:1px solid var(--color-gray-30);
    position:relative;
  }
  .icon-cross>.icon{
    position:absolute;
    width:60px;height:60px;
    top:-30px;left:calc(50% - 30px);
  }
`;
class Card extends WComponent{
  static attributes = {
    layout: {
      name: 'layout', defaultValue: 'standard', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^standard$|^icon-cross$/
      )
    },
    icon: {
      name: 'icon', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
      )
    },
    title: {
      name: 'title', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
      )
    },
    description: {
      name: 'description', defaultValue: '', 
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
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
    this.card=DOM.create("div", {props:{
      className:"card "+this.layout
    }}, this.shadowRoot);
    if(this.icon){
      DOM.create("img", {props:{className:"icon", src:this.icon}}, this.card);
    }
    if(this.title){
      DOM.create(getWTagName('heading'), {attrs:{level:4}, props:{className:"title", textContent:this.title}}, this.card);
    }
    if(this.description){
      DOM.create(getWTagName('heading'), {attrs:{level:4}, props:{className:"description", textContent:this.description}}, this.card);
    }
  }
}
Card.prototype.stylesheet=stylesheet;
export default Card;