import WComponent, { DOM, AttributeParser, getWTagName } from '../../WComponent.js';
const stylesheet=`
  .background{
    padding-top:120px;padding-bottom:0px;
    background-repeat:no-repeat;
  }
  .background>div.foreground{
    height:450px;
    background-repeat:no-repeat;
    padding-left:50px;
    padding-bottom:120px;
  }
  @media (max-width:800px){
    .background{
      background-image:none;
    }
    .background>div.foreground{
      background-image:none;
      padding-left:20px;
      padding-right:20px;
    }
  }
`;
class Hero extends WComponent{
  static tagName = 'hero';
  static attributes = {
    'background-image': {
      name: 'background-image', defaultValue: '',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /.*/
      )
    },
    'background-coverage': {
      name: 'background-coverage', defaultValue: 'center',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^center$|^full$/
      )
    },
    'background-position': {
      name: 'background-position', defaultValue: 'center',
      parser: (value, attr) => AttributeParser.parseStringAttr(
        value, attr.defaultValue, /^center$|^top$|^bottom$|^left$|^right$|^left-top$|^right-top$|^left-bottom$|^right-bottom$/
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
    const background=DOM.create(getWTagName('section'), {
      attrs:{cols:1, part:'full'},
      props:{className:'background'}
    }, this.shadowRoot);
    const foreground=DOM.create('div', {attrs:{part:'center'}, props:{
      className:'foreground'
    }}, background);
    DOM.create('slot', {}, foreground);
    // setup background image
    if(this['background-coverage']==='full'){
      DOM.modify(background, {styles:{
        'background-image':`url(${this['background-image']})`,
        'background-position':this['background-position'].replace('-', ' ')
      }});
    }else{ // center
      DOM.modify(foreground, {styles:{
        'background-image':`url(${this['background-image']})`,
        'background-position':this['background-position'].replace('-', ' ')
      }});
    }
  }
}
Hero.prototype.stylesheet=stylesheet;
export default Hero;