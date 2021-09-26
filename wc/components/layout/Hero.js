import WComponent, { DOM, AttributeParser } from '../../WComponent.js';
const stylesheet=`
  .keyvisual{
    padding-top:120px;padding-bottom:0px;
  }
  .keyvisual>div.welcome{
    height:450px;
    background-image:url("image/keyvisual.png");
    background-repeat:no-repeat;
    background-position:bottom right;
    padding-left:50px;
  }
`;
class Hero extends WComponent{
  static attributes = {
    type: {
      name: 'type', defaultValue: 'image',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^image$|^video$/
      )
    },
    src: {
      name: 'src', defaultValue: '',
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
    const section=DOM.create(`${window.wconfig.prefix}-section`, {attrs:{cols:1}, props:{className:'keyvisual'}}, this.shadowRoot);
    const welcome=DOM.create('div', {props:{
      className:'welcome'
    }}, section);
    DOM.create('slot', {}, welcome);
  }
}
Hero.prototype.stylesheet=stylesheet;
export default Hero;